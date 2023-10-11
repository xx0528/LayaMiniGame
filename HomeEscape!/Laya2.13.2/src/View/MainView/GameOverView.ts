import ryw_ViewBase from "../ViewBase";
import ryw_EventMgr from "../../Event/EventMgr";
import { ryw_EventDef } from "../../Event/EventDef";
import ryw_GameMgr from "../../Mgr/GameMgr";
import ryw_ViewMgr, { ryw_ViewDef } from "../../Mgr/ViewMgr";
import Utilit from "../../Utilit";
import ryw_KRQ_History from "../../KRQ/Com/KRQ_History/KRQ_History";

export default class GameOverView extends ryw_ViewBase {

    protected _nextBtn : Laya.Sprite = null;
    protected _winImg : Laya.Clip = null;

    protected _againBtn : Laya.Sprite = null;
    protected _lostImg : Laya.Clip = null;

    protected _topZone :Laya.Clip = null;
    protected _krqHistory : ryw_KRQ_History = null;

    onAwake(){
        this._nextBtn = this.owner.getChildByName("btnClip").getChildByName("NextBtn") as Laya.Sprite;
        this._winImg = this.owner.getChildByName("winImg") as Laya.Clip;

        this._againBtn = this.owner.getChildByName("btnClip").getChildByName("AgainBtn") as Laya.Sprite;
        this._lostImg = this.owner.getChildByName("lostImg") as Laya.Clip;


        // this._topZone = this.owner.getChildByName("TopZone") as Laya.Clip;
        // if(Utilit.isIphoneX()){
        //     this._topZone.top =  this._topZone.top + 75;
        // }

    }

    ryw_addEvent(){
        super.ryw_addEvent();
        this._nextBtn.on(Laya.Event.CLICK, this, this.onNextLevelClick);
        this._againBtn.on(Laya.Event.CLICK, this, this.onNextLevelClick);
        this._topZone.on(Laya.Event.CLICK, this, this.onHistoryBtn);
    }
    
    ryw_removeEvent(){
        super.ryw_removeEvent();
        this._nextBtn.off(Laya.Event.CLICK, this, this.onNextLevelClick);
        this._againBtn.off(Laya.Event.CLICK, this, this.onNextLevelClick);
        this._topZone.off(Laya.Event.CLICK, this, this.onHistoryBtn);
    }

    protected onHistoryBtn(){
        // ViewMgr.ryw_instance.openView(ViewDef.MoreGameView);
    }

    protected onNextLevelClick(){

        // var self = this;
        // ViewMgr.ryw_instance.openView(ViewDef.GameView, null, (v:ViewBase)=>{
        //     (v.owner as Laya.View).zOrder = 1;
        //     self.closeView();
        // });

        var self = this;
        ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.ryw_Export2View, null, (v:ryw_ViewBase)=>{
            self.ryw_closeView();
        });
    }


    public ryw_openView(data?: any):void{
        super.ryw_openView(data);
        var result : number = data.result;
        if (result==0){
            this._againBtn.visible = true;
            this._lostImg.visible = true;
            this._nextBtn.visible = false;
            this._winImg.visible = false;
        }
        else{
            this._againBtn.visible = false;
            this._lostImg.visible = false;
            this._nextBtn.visible = true;
            this._winImg.visible = true;
        }
    }
}