import ryw_KRQ_Banner from "./KRQ_Banner";
import ryw_WXAPI from "../../WXAPI";
import ryw_QQMiniGameAPI from "../../QQMiniGameAPI";
import ryw_AppSwitchConfig from "../../Config/AppSwitchConfig";
import ryw_WudianMgr from "../../Mgr/WudianMgr";

export default class ryw_KRQ_GamingBanner extends ryw_KRQ_Banner
{
    public ryw_refresh(onComplate? : Function)
    {
        let launchScene = null;
        if(Laya.Browser.onMiniGame)
        {
            launchScene = ryw_WXAPI.ryw_getLaunchOptionsSync().scene;
        }
        else if(Laya.Browser.onQQMiniGame)
        {
            launchScene = ryw_QQMiniGameAPI.ryw_getLaunchOptionsSync().scene;
        }
        let noEnterBySearch: boolean = true;
        let wudianSceneList = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wudianSceneList;
        for (let i = 0; i < wudianSceneList.length; ++i)  
        {
            let wudianSceneValue = wudianSceneList[i];
            if(launchScene == wudianSceneValue)
            {
                noEnterBySearch = false;
            }
        }
        let ipBlocked = ryw_WudianMgr.ryw_GetIpBlocked();
        if(!ipBlocked || !noEnterBySearch)
        {
            this.ryw_Sprite.visible = false;
            if(null != onComplate)
            {
                onComplate();
            }
            return;
        }
        let banner = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_banner;
        if (1 == banner)
        {
            this.ryw_refreshWXBanner();
        }
        else
        {
            super.ryw_refresh(()=>
            {
                this.ryw_refreshBanner();
                if(null != onComplate)
                {
                    onComplate();
                }
            })
        }
    }
}