import ryw_VVNativeAd1View from "./VVNativeAd1View";
import ryw_AppSwitchConfig from "../../../Config/AppSwitchConfig";

export default class VVNativeAd2View extends ryw_VVNativeAd1View
{
    protected onOkBtn()
    {
        if (Math.random() * 100 <= ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_vivocfg.ryw_yuansheng2) {
            console.log("进入变态广告");
            this.onDisplayClick();
        }   
        this.ryw_closeView();
    }
}