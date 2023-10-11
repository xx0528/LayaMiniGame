import BagView from "../View/BagView";
import MyList from "../../Common/MyList";
import Event_sdlyg_Mgr from "../../Event/EventMgr";
import { Event_sdlyg_Def } from "../../Event/EventDef";

export default class SkinTitle extends Laya.Script {

    private btn_choose:Laya.Button;
    private click_bg:Laya.Sprite;
    private m_BagView:BagView;
    private m_name:string;
    private m_display:Laya.Box;
    private m_display_list:MyList;
    private m_icon:Laya.Box;


    constructor() { super(); }

    onAwake(){
        this.m_BagView = this.owner.parent.getComponent(BagView);
        this.m_name = this.owner.name.slice(6);
        this.btn_choose = this.owner.getChildByName("btn_choose") as Laya.Button;
        this.click_bg = this.btn_choose.getChildByName("click_bg") as Laya.Sprite;
        this.m_display = this.owner.getChildByName("display") as Laya.Box;
        this.m_icon = this.owner.getChildByName("icon") as Laya.Box;
        this.m_display_list = this.m_display.getComponent(MyList);
        this.btn_choose.on(Laya.Event.CLICK,this,this.clickChoose);
        this.onNotChoose();        
    }



    onChoose(id:number){
        this.click_bg.visible = true;
        this.m_display.visible = true;
        this.m_icon.visible = true;
        this.m_display_list.toPageByID(id);
    }

    onNotChoose(){
        this.click_bg.visible = false;
        this.m_display.visible = false;
        this.m_icon.visible = false;
        
    }

    clickChoose(){
        this.m_BagView.chooseTitle(this.m_name);
        Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.ResetIcon);
    }

    getName():string{
        return this.m_name;
    }
}