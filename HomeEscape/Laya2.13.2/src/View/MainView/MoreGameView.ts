import ViewBase from "../ViewBase";
import Utilit from "../../Utilit";

export default class MoreGameView extends ViewBase{

    protected _backBtn : Laya.Sprite3D = null;
    // protected _topZone :Laya.Clip = null;

    onAwake(){

        this._backBtn = this.owner.getChildByName("KRQ_History").getChildByName("TopZone").getChildByName("BackBtn") as Laya.Sprite3D;

        // this._topZone = this.owner.getChildByName("TopZone") as Laya.Clip;
        // if(Utilit.isIphoneX()){
        //     this._topZone.top =  this._topZone.top + 75;
        // }
    }

    ryw_addEvent(){
        this._backBtn.on(Laya.Event.CLICK,this,this.onBackBtn);
        // this._topZone.on(Laya.Event.CLICK, this, this.onHistoryBtn);
    }

    ryw_removeEvent(){
        this._backBtn.off(Laya.Event.CLICK,this,this.onBackBtn);
        // this._topZone.off(Laya.Event.CLICK, this, this.onHistoryBtn);
    }

    // protected onHistoryBtn(){
    //     ViewMgr.ryw_instance.openView(ViewDef.MoreGameView);
    // }

    onBackBtn(){
        console.log("MoreGameView  onBackBtn");
        this.ryw_closeView();
    }
}