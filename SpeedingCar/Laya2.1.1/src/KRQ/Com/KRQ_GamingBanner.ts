import KRQ_wcjtn__Banner_wcjtn_ from "./KRQ_Banner";
import WX_wcjtn_API from "../../WXAPI";
import QQ_wcjtn_Mini_wcjtn_GameAPI from "../../QQMiniGameAPI";
import App_wcjtn_Switch_wcjtn_Config from "../../Config/AppSwitchConfig";
import Wu_wcjtn_dian_wcjtn_Mgr from "../../Mgr/WudianMgr";

export default class KRQ_Gaming_wcjtn_Banner extends KRQ_wcjtn__Banner_wcjtn_
{
    public ref_wcjtn_resh(onComplate? : Function)
    {
        let launchScene = null;
        if(Laya.Browser.onMiniGame)
        {
            launchScene = WX_wcjtn_API.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().scene;
        }
        else if(Laya.Browser.onQQMiniGame)
        {
            launchScene = QQ_wcjtn_Mini_wcjtn_GameAPI.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().scene;
        }
        let noEnterBySearch: boolean = true;
        let wudianSceneList = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wu_wcjtn_dian_wcjtn_Scene_wcjtn_List;
        for (let i = 0; i < wudianSceneList.length; ++i)  
        {
            let wudianSceneValue = wudianSceneList[i];
            if(launchScene == wudianSceneValue)
            {
                noEnterBySearch = false;
            }
        }
        let ipBlocked = Wu_wcjtn_dian_wcjtn_Mgr.Get_wcjtn_Ip_wcjtn_Blocked();
        if(!ipBlocked || !noEnterBySearch)
        {
            this._wcjtn_Sprite_wcjtn_.visible = false;
            if(null != onComplate)
            {
                onComplate();
            }
            return;
        }
        let banner = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().ba_wcjtn_nner;
        if (1 == banner)
        {
            this.refresh_wcjtn_WXBanner();
        }
        else
        {
            super.ref_wcjtn_resh(()=>
            {
                this.refresh_wcjtn_Banner();
                if(null != onComplate)
                {
                    onComplate();
                }
            })
        }
    }
}