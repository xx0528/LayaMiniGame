import Banne_JJKLBB_rAdView from "./BannerAdView";
import Even_JJKLBB_tMgr from "../../Event/EventMgr";
import { Event_JJKLBB_Def } from "../../Event/EventDef";
import View_JJKLBB_Mgr from "../../Mgr/ViewMgr";

export default class MyBannerAdView extends Banne_JJKLBB_rAdView {
    constructor() {
        super()
    }
    onAwake() {
        super.onAwake()
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.AD_SwitchBanner, this, this.switchBanner);
    }
    onDestroy(){
        super.onDestroy();
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.AD_SwitchBanner, this, this.switchBanner);
    }
    switchBanner(res: boolean) {
        console.log("Swtich Banner",res);
        if (res) {
            this.onEnable();
        }
        else {
            this.onDisable();
        }
    }
}