import ViewBase from "../../View/ViewBase";
import View_sdlyg_Mgr, { View_sdlyg_Def } from "../../Mgr/ViewMgr";


export default class EnterGamePop extends ViewBase {

    private btn_close:Laya.Button;
    
    constructor() { super(); }
    
    onAwake(){
        this.btn_close = this.owner.getChildByName("btn_close") as Laya.Button;
    }

    addEvent(){
        this.btn_close.on(Laya.Event.CLICK,this,this.clickClose);
    }

    clickClose(){
        View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.EnterGamePop);
    }
}