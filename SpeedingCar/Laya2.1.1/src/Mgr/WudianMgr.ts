import Http_wcjtn_Unit from "../Net/HttpUnit";
import App_wcjtn_Switch_wcjtn_Config from "../Config/AppSwitchConfig";
import WX_wcjtn_API from "../WXAPI";
import QQ_wcjtn_Mini_wcjtn_GameAPI from "../QQMiniGameAPI";
import Event_wcjtn_Mgr from "../Event/EventMgr";
import { Event_wcjtn_Def } from "../Event/EventDef";

export default class Wu_wcjtn_dian_wcjtn_Mgr {
    private static _ipBlockFlag: number = -1;
    public static Ip_wcjtn_Block_wcjtn_Flag(): number {
        return Wu_wcjtn_dian_wcjtn_Mgr._ipBlockFlag;
    }
    /**
     * 此方法调用很慢，所以要在游戏初始化的时候调用一次此方法
     * 
     * @static
     * @memberof WudianMgr
     */
    public static Update_wcjtn_IpBlock_wcjtn_State() {
        Http_wcjtn_Unit.Get_wcjtn_Ip_wcjtn_Block(
            function (res) {
                console.log("调用IpBlock接口成功,结果为:", res);
                Wu_wcjtn_dian_wcjtn_Mgr._ipBlockFlag = res.code;
                Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.App_On_wcjtn_Update_wcjtn_IpBlockState,{ipBlockFlag : Wu_wcjtn_dian_wcjtn_Mgr._ipBlockFlag});
            },
            null
        )
    }
    /**
     * IP是否被屏蔽
     * 
     * @static
     * @returns {boolean} 
     * @memberof WudianMgr
     */
    public static Get_wcjtn_Ip_wcjtn_Blocked(): boolean {
        return Wu_wcjtn_dian_wcjtn_Mgr._ipBlockFlag == 0;
    }
    /**
     * 得到用户进入的场景值
     * 
     * @static
     * @returns {number} 
     * @memberof WudianMgr
     */
    public static Get_wcjtn_Entry_wcjtn_Scene(): boolean {
        return WX_wcjtn_API.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().scene == 1006;
    }
    /**
     * 误点开关是否打开，包括了总开关和分时开关
     * 
     * @static
     * @returns {boolean} 
     * @memberof WudianMgr
     */
    public static Is_wcjtn_Switch_wcjtn_Open(): boolean {
        let mainSwitch = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wu_wcjtn_dian == 1;
        let isOpenTime = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wudianTimeAvaliable;
        console.log("误点Flag状态: ", "总开关:", mainSwitch, "打开时间", isOpenTime);
        return mainSwitch && isOpenTime;
    }
    /**
     * 完全封装好的误点Flag
     * 
     * @readonly
     * @static
     * @type {boolean}
     * @memberof WudianMgr
     */
    public static get Wu_wcjtn_dian_wcjtn_Flag(): boolean {
        let mainSwitch = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wu_wcjtn_dian == 1;

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
        var wudianSceneList = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wu_wcjtn_dian_wcjtn_Scene_wcjtn_List;
        for (var i = 0; i < wudianSceneList.length; ++i)  
        {
            var wudianSceneValue = wudianSceneList[i];
            if(launchScene == wudianSceneValue)
            {
                noEnterBySearch = false;
            }
        }
        let isOpenTime = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wudianTimeAvaliable;
        let ipnotBlock = Wu_wcjtn_dian_wcjtn_Mgr._ipBlockFlag == 0;
        /* 测试功能，等删 */
        // ipnotBlock = true;
        console.log("误点Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽", ipnotBlock, "打开时间",
            isOpenTime);
        return mainSwitch && noEnterBySearch && ipnotBlock && isOpenTime;
    }
    /**
     * 没有涉及到定时开关的wudianFlag,自行整合按照时间开关的效果
     * 
     * @static
     * @returns {boolean} 
     * @memberof WudianMgr
     */
    public static get No_wcjtn_Time_wcjtn_Wudian_wcjtn_Flag(): boolean {
        let mainSwitch = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wu_wcjtn_dian == 1;
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
        var wudianSceneList = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wu_wcjtn_dian_wcjtn_Scene_wcjtn_List;
        for (var i = 0; i < wudianSceneList.length; ++i)  
        {
            var wudianSceneValue = wudianSceneList[i];
            if(launchScene == wudianSceneValue)
            {
                noEnterBySearch = false;
            }
        }
        let ipnotBlock = Wu_wcjtn_dian_wcjtn_Mgr._ipBlockFlag == 0;
        /* 测试功能，等删 */
        // ipnotBlock = true;
        console.log("误点Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽");
        return mainSwitch && noEnterBySearch && ipnotBlock;
    }
}