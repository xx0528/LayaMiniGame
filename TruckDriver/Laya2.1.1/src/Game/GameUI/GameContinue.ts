import ViewBase from "../../View/ViewBase";
import View_ppxhc_Mgr, { View_ppxhc_Def } from "../../Mgr/ViewMgr";
import { Event_ppxhc_Def } from "../../Event/EventDef";
import Event_ppxhc_Mgr from "../../Event/EventMgr";
import AppSwitchConfig from "../../Config/AppSwitchConfig";
import Exprot2View_ppxhc_Template from "../../View/TemplateViews/Export2/Exprot2ViewTemplate";
import ViewMgr from "../../Mgr/ViewMgr";

export default class GameContinue extends Exprot2View_ppxhc_Template {
    onContinueBtn(): void {
        if(!this._isCanClose)
            return;
        let self = this;
        let excute = ()=>
        {
            self.closeView();//关闭此界面
            //todo:你关闭此界面之后你的逻辑
            console.log("-----------------下一关");
            Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.Car_LevelUp);
            this.closeView();
            View_ppxhc_Mgr.instance.openView(View_ppxhc_Def.GameHome,{view:0});
        }
        ViewMgr.instance.tryShowPopAd((v : ViewBase)=> //尝试打开 ViewDef.Export3View 界面
        {
            if(null != v)//成功打开 ViewDef.Export3View 界面
            {
                v.onCloseEvent = ()=> //当 ViewDef.Export3View 界面关闭 后执行你的逻辑
                {
                    excute();
                }
            }
            else
            {
                excute();  //当 ViewDef.Export3View 界面不能打开 后执行你的逻辑
            }
        })
    }
}