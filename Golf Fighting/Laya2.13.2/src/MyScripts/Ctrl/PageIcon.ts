import Event_sdlyg_Mgr from "../../Event/EventMgr";
import { Event_sdlyg_Def } from "../../Event/EventDef";

export default class PageIcon extends Laya.Script {

    /** @prop {name:amount, tips:"几个页面", type:number, default:0}*/
    public amount: number = 0;
    private page_list:Laya.Sprite[] = new Array();
    private m_owner:Laya.Box;
    constructor() { super(); }
    
    onAwake(){
        this.m_owner = this.owner as Laya.Box;
        for(let i = 0; i<this.amount ; i++){
            let sp = this.m_owner.getChildByName("icon"+i).getChildByName("page") as Laya.Sprite;
            sp.visible = false;
            this.page_list.push(sp);
        }
        this.page_list[0].visible = true;        
    }

    onStart(){
        Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.ChangePage,this,this.setPage);
        Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.ResetIcon,this,this.setPage);
    }

    onDestroy(){
        Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.ChangePage,this,this.setPage);
        Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.ResetIcon,this,this.setPage);
    }

    setPage(num:number = 0){
        if(this.m_owner.visible){
            this.page_list.forEach(page => {
                page.visible = false;
            });
            this.page_list[num].visible = true;
        }
    }
}