import ViewBase from "../../View/ViewBase";
import View_sdlyg_Mgr, { View_sdlyg_Def } from "../../Mgr/ViewMgr";

export default class MoreGameView extends ViewBase {
    
    private btn_back:Laya.Button;
    constructor() { super(); }

    onAwake(){
        this.btn_back = this.owner.getChildByName("btn_back") as Laya.Button;
    }

    addEvent(){
        this.btn_back.on(Laya.Event.CLICK,this,this.clickBack);
    }

    clickBack(){
        if(this._data){
            //游戏中打开的
            View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.MoreGameView);            
        }else{
            //首页打开的
            View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.MenuView);        
            View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.MoreGameView);
        }
    }
}