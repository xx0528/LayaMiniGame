import Us_sdlyg_er from "../User/User";
import Event_sdlyg_Mgr from "../Event/EventMgr";
import { Event_sdlyg_Def } from "../Event/EventDef";
import Sound_sdlyg_Mgr, { SoundType } from "../Mgr/SoundMgr";

export default class MyBagItem extends Laya.Script {

    private m_name:string;
    private m_icon:Laya.Image;
    private m_lock:Laya.Sprite;
    private m_new:Laya.Sprite;

    private icon_skin_path:string = "subRes/propsLogo/";
    private choose:Laya.Sprite;

    private new_rot:number=1;
    
    constructor() { super(); }

    onAwake(){
        this.m_icon = this.owner.getChildByName("m_icon") as Laya.Image;
        this.m_lock = this.owner.getChildByName("m_lock") as Laya.Sprite;
        this.choose = this.owner.getChildByName("choose") as Laya.Sprite;
        this.m_new = this.owner.getChildByName("new") as Laya.Sprite;
        
        this.m_new.visible = false;
        this.choose.visible = false;
        this.m_name = this.owner.name;
        this.setLock();
        this.setIcon();
    }

    onStart(){
        Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.ChooseProp,this,this.onChoose);
        Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.GetNewSkin,this,this.GetNew);
    }

    onDestroy(){
        Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.ChooseProp,this,this.onChoose);
        Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.GetNewSkin,this,this.GetNew);
    }

    onUpdate(){
        if(this.m_new.visible){
            this.m_new.rotation+=this.new_rot;
            if(Math.abs(this.m_new.rotation)>=15)this.new_rot= -this.new_rot;
        }
    }

    setLock(){
        if(this.m_lock){
            this.m_lock.visible = !Us_sdlyg_er.ownerProp(this.m_name);
        }
    }
    
    GetNew(name:string){
        if(name == this.m_name)this.m_new.visible = true;
        this.setLock();
    }

    setIcon(){
        if(this.m_name){
            this.m_icon.skin = this.icon_skin_path+this.m_name+".png";
        }
    }

    onClick(){
        Sound_sdlyg_Mgr.instance.playSound(SoundType.Button);
        if(Us_sdlyg_er.ownerProp(this.m_name)){
            if(this.m_new.visible)this.m_new.visible=false; 
            Sound_sdlyg_Mgr.instance.playSound(SoundType.SkinBtn);       
            Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.ChooseProp,this.m_name);
        }
    }

    onChoose(name:string){
        name==this.m_name?this.choose.visible=true:this.choose.visible=false;
    }
}