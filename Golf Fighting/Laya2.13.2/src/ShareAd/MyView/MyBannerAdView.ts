import Share_sdlyg_Ad from "../ShareAd";
import WXAPI from "../../WXAPI";
import ALD from "../../ALD";
import Event_sdlyg_Mgr from "../../Event/EventMgr";
import { Event_sdlyg_Def } from "../../Event/EventDef";
import AppSwitchConfig from "../../Config/AppSwitchConfig";
import OPPOAPI from "../../OPPOAPI";
import QQMiniGameAPI from "../../QQMiniGameAPI";
import BannerAdView from "../View/BannerAdView";

export default class MyBannerAdView extends BannerAdView
{


    onAwake()
    {
        super.onAwake();
        Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.MoreGameView,this,this.onMoreGameView);
        Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.OutMoreGameView,this,this.outMoreGameView);
    }

    onDestroy(){
        super.onDestroy();
        Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.MoreGameView,this,this.onMoreGameView);
        Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.OutMoreGameView,this,this.outMoreGameView);

    }
    

    private onMoreGameView(){
        if(this._wxBanner)this._wxBanner.hide();
    }

    private outMoreGameView(){
        if(this._wxBanner)this._wxBanner.show();
    }
}