import ViewBase from "../../View/ViewBase";
import View_sdlyg_Mgr, { View_sdlyg_Def } from "../../Mgr/ViewMgr";
import Event_sdlyg_Mgr from "../../Event/EventMgr";
import { Event_sdlyg_Def } from "../../Event/EventDef";

export default class SideADView extends ViewBase {

    private btn_close:Laya.Button;
    private sideAD:Laya.Image;
    private start_x:number = 0;

    constructor() { super(); }

    onAwake(){
        this.sideAD = this.owner.getChildByName("sideAD") as Laya.Image;
        this.btn_close = this.sideAD.getChildByName("btn_close") as Laya.Button;        
        this.start_x = -this.sideAD.width;
    }

    onStart(){
        // this.sideADShow();
    }



    addEvent(){
        this.btn_close.on(Laya.Event.CLICK,this,this.clickClose);
    }

    clickClose(){
        this.sideADHide();
    }

    sideADShow(){
        Laya.Tween.to(this.sideAD,{x:0},300,Laya.Ease.expoOut,Laya.Handler.create(this,()=>{
            this.btn_close.visible = true;
        }));
    }

    sideADHide(){
        Laya.Tween.clearAll(this);
        this.btn_close.visible = false;
        Laya.Tween.to(this.sideAD,{x:this.start_x},300,Laya.Ease.expoOut,Laya.Handler.create(this,()=>{
            View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.SideAdView);
        }));
    }

}