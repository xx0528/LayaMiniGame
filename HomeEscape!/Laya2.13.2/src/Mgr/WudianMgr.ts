import ryw_HttpUnit from "../Net/HttpUnit";
import ryw_AppSwitchConfig from "../Config/AppSwitchConfig";
import ryw_WXAPI from "../WXAPI";
import ryw_QQMiniGameAPI from "../QQMiniGameAPI";
import ryw_EventMgr from "../Event/EventMgr";
import { ryw_EventDef } from "../Event/EventDef";

export default class ryw_WudianMgr {
    private static ryw__ipBlockFlag: number = -1;
    public static ryw_IpBlockFlag(): number {
        return ryw_WudianMgr.ryw__ipBlockFlag;
    }
    /**
     * 此方法调用很慢，所以要在游戏初始化的时候调用一次此方法
     * 
     * @static
     * @memberof WudianMgr
     */
    public static ryw_UpdateIpBlockState() {
        ryw_HttpUnit.ryw_GetIpBlock(
            function (res) {
                console.log("调用IpBlock接口成功,结果为:", res);
                ryw_WudianMgr.ryw__ipBlockFlag = res.code;
                ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_App_OnUpdateIpBlockState,{ipBlockFlag : ryw_WudianMgr.ryw__ipBlockFlag});
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
    public static ryw_GetIpBlocked(): boolean {
        return ryw_WudianMgr.ryw__ipBlockFlag == 0;
    }
    /**
     * 得到用户进入的场景值
     * 
     * @static
     * @returns {number} 
     * @memberof WudianMgr
     */
    public static ryw_GetEntryScene(): boolean {
        return ryw_WXAPI.ryw_getLaunchOptionsSync().scene == 1006;
    }
    /**
     * 误点开关是否打开，包括了总开关和分时开关
     * 
     * @static
     * @returns {boolean} 
     * @memberof WudianMgr
     */
    public static ryw_IsSwitchOpen(): boolean {
        let mainSwitch = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wudian == 1;
        let isOpenTime = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().wudianTimeAvaliable;
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
    public static get ryw_WudianFlag(): boolean {
        let mainSwitch = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wudian == 1;

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
        var wudianSceneList = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wudianSceneList;
        for (var i = 0; i < wudianSceneList.length; ++i)  
        {
            var wudianSceneValue = wudianSceneList[i];
            if(launchScene == wudianSceneValue)
            {
                noEnterBySearch = false;
            }
        }
        let isOpenTime = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().wudianTimeAvaliable;
        let ipnotBlock = ryw_WudianMgr.ryw__ipBlockFlag == 0;
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
    public static get ryw_NoTimeWudianFlag(): boolean {
        let mainSwitch = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wudian == 1;
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
        var wudianSceneList = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wudianSceneList;
        for (var i = 0; i < wudianSceneList.length; ++i)  
        {
            var wudianSceneValue = wudianSceneList[i];
            if(launchScene == wudianSceneValue)
            {
                noEnterBySearch = false;
            }
        }
        let ipnotBlock = ryw_WudianMgr.ryw__ipBlockFlag == 0;
        /* 测试功能，等删 */
        // ipnotBlock = true;
        console.log("误点Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽");
        return mainSwitch && noEnterBySearch && ipnotBlock;
    }
}