import Http_ppxhc_Unit from "../Net/HttpUnit";
import AppSwitchConfig from "../Config/AppSwitchConfig";
import WXAPI_ from "../WXAPI";
import QQMiniGame_ppxhc_API from "../QQMiniGameAPI";
import EventMgr from "../Event/EventMgr";
import { Event_ppxhc_Def } from "../Event/EventDef";

export default class Wudian_ppxhc_Mgr {
    private static _ipBlock_ppxhc_Flag: number = -1;
    public static IpBlock_ppxhc_Flag(): number {
        return Wudian_ppxhc_Mgr._ipBlock_ppxhc_Flag;
    }
    /**
     * 此方法调用很慢，所以要在游戏初始化的时候调用一次此方法
     * 
     * @static
     * @memberof WudianMgr
     */
    public static UpdateIpBlock_ppxhc_State() {
        Http_ppxhc_Unit.GetIpBlock(
            function (res) {
                console.log("调用IpBlock接口成功,结果为:", res);
                Wudian_ppxhc_Mgr._ipBlock_ppxhc_Flag = res.code;
                EventMgr.instance.dispatch_(Event_ppxhc_Def.App_OnUpdateIpBlockState,{ipBlockFlag : Wudian_ppxhc_Mgr._ipBlock_ppxhc_Flag});
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
    public static GetIp_ppxhc_Blocked(): boolean {
        return Wudian_ppxhc_Mgr._ipBlock_ppxhc_Flag == 0;
    }
    /**
     * 得到用户进入的场景值
     * 
     * @static
     * @returns {number} 
     * @memberof WudianMgr
     */
    public static GetEntry_ppxhc_Scene(): boolean {
        return WXAPI_.getLaunchOptionsSync().scene == 1006;
    }
    /**
     * 误点开关是否打开，包括了总开关和分时开关
     * 
     * @static
     * @returns {boolean} 
     * @memberof WudianMgr
     */
    public static IsSwitch_ppxhc_Open(): boolean {
        let mainSwitch = AppSwitchConfig.getInstance().getAppSwitchData().wudian == 1;
        let isOpenTime = AppSwitchConfig.getInstance().getAppSwitchData().wudianTimeAvaliable;
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
    public static get Wudian_ppxhc_Flag(): boolean {
        let mainSwitch = AppSwitchConfig.getInstance().getAppSwitchData().wudian == 1;

        let launchScene = null;
        if(Laya.Browser.onMiniGame)
        {
            launchScene = WXAPI_.getLaunchOptionsSync().scene;
        }
        else if(Laya.Browser.onQQMiniGame)
        {
            launchScene = QQMiniGame_ppxhc_API.getLaunchOptionsSync().scene;
        }

        let noEnterBySearch: boolean = true;
        var wudianSceneList = AppSwitchConfig.getInstance().getAppSwitchData().wudianSceneList;
        for (var i = 0; i < wudianSceneList.length; ++i)  
        {
            var wudianSceneValue = wudianSceneList[i];
            if(launchScene == wudianSceneValue)
            {
                noEnterBySearch = false;
            }
        }
        let isOpenTime = AppSwitchConfig.getInstance().getAppSwitchData().wudianTimeAvaliable;
        let ipnotBlock = Wudian_ppxhc_Mgr._ipBlock_ppxhc_Flag == 0;
        /* 测试功能，等删 */
        // ipnotBlock = true;
        console.log("误点Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽", ipnotBlock, "打开时间",
            isOpenTime);
        return mainSwitch && noEnterBySearch && ipnotBlock //&& isOpenTime;
    }
    /**
     * 没有涉及到定时开关的wudianFlag,自行整合按照时间开关的效果
     * 
     * @static
     * @returns {boolean} 
     * @memberof WudianMgr
     */
    public static get NoTimeWudian_ppxhc_Flag(): boolean {
        let mainSwitch = AppSwitchConfig.getInstance().getAppSwitchData().wudian == 1;
        let launchScene = null;
        if(Laya.Browser.onMiniGame)
        {
            launchScene = WXAPI_.getLaunchOptionsSync().scene;
        }
        else if(Laya.Browser.onQQMiniGame)
        {
            launchScene = QQMiniGame_ppxhc_API.getLaunchOptionsSync().scene;
        }
        
        let noEnterBySearch: boolean = true;
        var wudianSceneList = AppSwitchConfig.getInstance().getAppSwitchData().wudianSceneList;
        for (var i = 0; i < wudianSceneList.length; ++i)  
        {
            var wudianSceneValue = wudianSceneList[i];
            if(launchScene == wudianSceneValue)
            {
                noEnterBySearch = false;
            }
        }
        let ipnotBlock = Wudian_ppxhc_Mgr._ipBlock_ppxhc_Flag == 0;
        /* 测试功能，等删 */
        // ipnotBlock = true;
        console.log("误点Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽");
        return mainSwitch && noEnterBySearch && ipnotBlock;
    }
}