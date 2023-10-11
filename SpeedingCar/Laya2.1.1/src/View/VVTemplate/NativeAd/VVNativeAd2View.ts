import VVNativeAd1View from "./VVNativeAd1View";
import AppSwitchConfig from "../../../Config/AppSwitchConfig";

export default class VVNativeAd2View extends VVNativeAd1View
{
    protected onOkBtn()
    {
        if (Math.random() * 100 <= AppSwitchConfig.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().vivocfg.yuansheng2) {
            console.log("进入变态广告");
            this.onDisplayClick();
        }   
        this.close_wcjtn_View();
    }
}