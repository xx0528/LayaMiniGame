import ViewBase from "../../View/ViewBase";
import View_ppxhc_Mgr, { View_ppxhc_Def } from "../../Mgr/ViewMgr";

export default class GameHistory extends ViewBase {
    _backBtn : Laya.Sprite = null;
        
    onAwake()
    {

        this._backBtn = this.owner.getChildByName("KRQ_History").getChildByName("TopZone").getChildByName("BackBtn") as Laya.Sprite;
        this._backBtn.on(Laya.Event.CLICK,this,this.onBackBtn);
    }  
    onBackBtn()
    {        
        View_ppxhc_Mgr.instance.closeView(View_ppxhc_Def.GameHistory);
    }

}