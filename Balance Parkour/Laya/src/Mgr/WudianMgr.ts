import Http_tippy_Unit from "../Net/HttpUnit";
import AppSwitch_tippy_Config from "../Config/AppSwitchConfig";
import WXAPI from "../WXAPI";
import Net_tippy_Config from "../Net/NetConfig";
import QQMiniGameAPI from "../QQMiniGameAPI";

export default class Wudian_tippy_Mgr {
    private static _ipBlockFlag: number = -1;
    public static IpBlockFlag(): number {
        return Wudian_tippy_Mgr._ipBlockFlag;
    }
    /**
     * 此方法调用很慢，所以要在游戏初始化的时候调用一次此方法
     * 
     * @static
     * @memberof WudianMgr
     */
    public static UpdateIpBlockState() {
        Http_tippy_Unit.GetIp_tippy_Block(
            function (res) {
                console.log("调用IpBlock接口成功,结果为:", res);
                Wudian_tippy_Mgr._ipBlockFlag = res.code;
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
    public static GetIpBlocked(): boolean {
        return Wudian_tippy_Mgr._ipBlockFlag == 0;
    }
    /**
     * 得到用户进入的场景值
     * 
     * @static
     * @returns {number} 
     * @memberof WudianMgr
     */
    public static GetEntryScene(): boolean {
        return WXAPI.getLaunchOptionsSync().scene == 1006;
    }
    /**
     * 误点开关是否打开，包括了总开关和分时开关
     * 
     * @static
     * @returns {boolean} 
     * @memberof WudianMgr
     */
    public static IsSwitchOpen(): boolean {
        let mainSwitch = AppSwitch_tippy_Config.get_tippy_Instance().getAppSwitchData().wudian == 1;
        let isOpenTime = AppSwitch_tippy_Config.get_tippy_Instance().getAppSwitchData().wudianTimeAvaliable;
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
    public static get WudianFlag(): boolean {
        let mainSwitch = AppSwitch_tippy_Config.get_tippy_Instance().getAppSwitchData().wudian == 1;
        let launchScene = QQMiniGameAPI.getLaunchOptionsSync().scene;
        let noEnterBySearch: boolean = true;
        var wudianSceneList = AppSwitch_tippy_Config.get_tippy_Instance().getAppSwitchData().wudianSceneList;
        for (var i = 0; i < wudianSceneList.length; ++i) {
            var wudianSceneValue = wudianSceneList[i];
            if (launchScene == wudianSceneValue) {
                noEnterBySearch = false;
            }
        }
        let isOpenTime = AppSwitch_tippy_Config.get_tippy_Instance().getAppSwitchData().wudianTimeAvaliable;
        // let ipnotBlock = Wudian_tippy_Mgr._ipBlockFlag == 0;
        let ipnotBlock = this._ipBlockFlag == 0;
        let version = AppSwitch_tippy_Config.get_tippy_Instance().getAppSwitchData().version == Net_tippy_Config.version;
        
        console.log("误点Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽", ipnotBlock, "打开时间",
            isOpenTime, "版本号:", version);

        console.log("----------------------------------------- version:" + AppSwitch_tippy_Config.get_tippy_Instance().getAppSwitchData().version);
        return mainSwitch && noEnterBySearch && ipnotBlock && isOpenTime && version;
        // return true;
    }
    /**
     * 没有涉及到定时开关的wudianFlag,自行整合按照时间开关的效果
     * 
     * @static
     * @returns {boolean} 
     * @memberof WudianMgr
     */
    public static get NoTimeWudianFlag(): boolean {
        let mainSwitch = AppSwitch_tippy_Config.get_tippy_Instance().getAppSwitchData().wudian == 1;
        let noEnterBySearch: boolean = WXAPI.getLaunchOptionsSync().scene != 1006;
        let ipnotBlock = Wudian_tippy_Mgr._ipBlockFlag == 0;
        /* 测试功能，等删 */
        // ipnotBlock = true;
        console.log("误点Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽");
        return mainSwitch && noEnterBySearch && ipnotBlock;
    }
}