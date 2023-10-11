import ViewBase from "../../View/ViewBase";
import View_sdlyg_Mgr, { View_sdlyg_Def } from "../../Mgr/ViewMgr";
import GameManager from "../Manager/GameManager";
import Share_sdlyg_Ad from "../../ShareAd/ShareAd";
import AppSwitchConfig from "../../Config/AppSwitchConfig";
import Event_sdlyg_Mgr from "../../Event/EventMgr";
import { Event_sdlyg_Def } from "../../Event/EventDef";
import { OverViewType } from "./OverView";

export default class MoreGameView2 extends ViewBase {


    private btn_continue: Laya.Button;
    private btn_close:Laya.Button;
    

    constructor() { super(); }

    onAwake() {
        this.btn_close = this.owner.getChildByName("btn_close") as Laya.Button;        
        this.btn_continue = this.owner.getChildByName("btn_continue") as Laya.Button;
        this.btn_continue.visible = false;
        Laya.timer.once(2000,this,()=>{
            this.btn_continue.visible = true;
        })
        if(Laya.Browser.onQGMiniGame)this.clickContinue();
        Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.MoreGameView);
    }


    onDestroy(){
        Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.OutMoreGameView);        
    }

    onStart(){
        super.onStart();
        if(GameManager.Instance().getHighView())
        {
            this.btn_close.top = 147
        }

        Share_sdlyg_Ad.RandomJump(AppSwitchConfig.getInstance().getAppSwitchData().morefunpop);
    }

    addEvent() {
        this.btn_continue.on(Laya.Event.CLICK, this, this.clickContinue);
        this.btn_close.on(Laya.Event.CLICK,this,this.clickClose);
    }

    clickContinue() {
        if (this._data) {
            //结束界面打开
            if(this._data.onlyShow){
                View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.MoreGame);            
            }else{
                if(this._data.win){
                    View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.OverView,OverViewType.WinGame);            
                }else{
                    View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.OverView,OverViewType.LoseGame);                                
                }
                View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.MoreGame);   
            }
         
        } else {
            //首页打开
            View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.MenuView);
            View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.MoreGame);
        }
    }

    clickClose(){
        View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.MoreGame);
        View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.MoreGameView);                
    }
}