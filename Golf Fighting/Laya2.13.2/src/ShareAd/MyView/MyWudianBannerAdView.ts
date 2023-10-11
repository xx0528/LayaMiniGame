import CachedWXBannerAd from "../../CachedWXBannerAd";
import Event_sdlyg_Mgr from "../../Event/EventMgr";
import { Event_sdlyg_Def } from "../../Event/EventDef";
import WudianMgr from "../../Mgr/WudianMgr";

export default class MyWudianBannerAdView extends Laya.Script {

    
    constructor() { super(); }
    
    onAwake(){
        Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.MoreGameView,this,this.Show);
        Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.OutMoreGameView,this,this.Hide);
        Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.ShowWudianBanner,this,this.Show);
    }

    onStart(){
        this.Show();
    }


    onDestroy(){
        Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.MoreGameView,this,this.Show);
        Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.OutMoreGameView,this,this.Hide);
        Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.ShowWudianBanner,this,this.Show);
        
        CachedWXBannerAd.hide();
    }

    Show(){
        CachedWXBannerAd.show();
    }

    Hide(){
        CachedWXBannerAd.hide();
    }
}