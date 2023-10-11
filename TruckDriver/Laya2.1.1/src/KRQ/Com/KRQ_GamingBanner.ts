import KRQ_Banner from "./KRQ_Banner";
import WXAPI from "../../WXAPI";
import QQMiniGameAPI from "../../QQMiniGameAPI";
import AppSwitchConfig from "../../Config/AppSwitchConfig";
import WudianMgr from "../../Mgr/WudianMgr";

export default class KRQ_GamingBanner extends KRQ_Banner
{
    public refresh(onComplate? : Function)
    {
        let launchScene = null;
        if(Laya.Browser.onMiniGame)
        {
            launchScene = WXAPI.getLaunchOptionsSync().scene;
        }
        else if(Laya.Browser.onQQMiniGame)
        {
            launchScene = QQMiniGameAPI.getLaunchOptionsSync().scene;
        }
        let noEnterBySearch: boolean = true;
        let wudianSceneList = AppSwitchConfig.getInstance().getAppSwitchData().wudianSceneList;
        for (let i = 0; i < wudianSceneList.length; ++i)  
        {
            let wudianSceneValue = wudianSceneList[i];
            if(launchScene == wudianSceneValue)
            {
                noEnterBySearch = false;
            }
        }
        let ipBlocked = WudianMgr.GetIp_ppxhc_Blocked();
        if(!ipBlocked || !noEnterBySearch)
        {
            this.Sprite.visible = false;
            if(null != onComplate)
            {
                onComplate();
            }
            return;
        }
        let banner = AppSwitchConfig.getInstance().getAppSwitchData().banner;
        if (1 == banner)
        {
            this.refreshWXBanner();
        }
        else
        {
            super.refresh_ppxhc(()=>
            {
                this.refreshBanner();
                if(null != onComplate)
                {
                    onComplate();
                }
            })
        }
    }
}