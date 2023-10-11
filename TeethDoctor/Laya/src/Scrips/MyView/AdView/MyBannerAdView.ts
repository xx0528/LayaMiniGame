import Even_XYXZS_tMgr from "../../../Event/EventMgr";
import { Even_XYXZS_tDef } from "../../../Event/EventDef";
import KRQ__XYXZS_Banner from "../../../KRQ/Com/KRQ_Banner";

export default class MyBannerAdView extends KRQ__XYXZS_Banner {
    constructor() {
        super()
    }
    onAwake() {
        super.onAwake() 
    }
    onEnable(){
        super.onEnable();
        Even_XYXZS_tMgr.in_XYXZS_stance.reg_XYXZS_Evemt(Even_XYXZS_tDef.AD_Switch_XYXZS_Banner, this, this.switch_XYXZS_Banner);
    }
    onDestroy(){
        super.onDestroy();
        Even_XYXZS_tMgr.in_XYXZS_stance.re_XYXZS_moveEvent(Even_XYXZS_tDef.AD_Switch_XYXZS_Banner, this, this.switch_XYXZS_Banner);
    }
    switch_XYXZS_Banner(res: boolean) {
        console.log("Swtich Banner",res);
        if (res) {
            this.show();
        }
        else {
            this.hide();
        }
    }
}