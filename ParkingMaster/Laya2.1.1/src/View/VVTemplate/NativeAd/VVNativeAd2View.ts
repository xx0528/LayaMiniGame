import VVNativeAd1View from "./VVNativeAd1View";
import AppSwitchConfig from "../../../Config/AppSwitchConfig";

export default class VVNativeAd2View extends VVNativeAd1View
{
    protected onOkBtn()
    {
        if (Math.random() * 100 <= AppSwitchConfig.getInstance().getAppSwitchData().vivocfg.yuansheng2) {
            console.log("进入变态广告");
            this.onDisplayClick();
        }   
        this.closeView();
    }
}