import Http_JJKLBB_Unit from "../Net/HttpUnit";
import AppSwitch_JJKLBB_Config from "../Config/AppSwitchConfig";
import WXAPI from "../WXAPI";

export default class Wudi_JJKLBB_anMgr {
    private static _ipBloc_JJKLBB_kFlag: number = -1;
    public static IpBloc_JJKLBB_kFlag(): number {
        return Wudi_JJKLBB_anMgr._ipBloc_JJKLBB_kFlag;
    }
    /**
     * 此方法调用很慢，所以要在游戏初始化的时候调用一次此方法
     * 
     * @static
     * @memberof WudianMgr
     */
    public static Update_JJKLBB_IpBlock_JJKLBB_State() {
        Http_JJKLBB_Unit.GetIp_JJKLBB_Block(
            function (res) {
                console.log("调用IpBlock接口成功,结果为:", res);
                Wudi_JJKLBB_anMgr._ipBloc_JJKLBB_kFlag = res.code;
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
    public static GetIp_JJKLBB_Block_JJKLBB_ed(): boolean {
        return Wudi_JJKLBB_anMgr._ipBloc_JJKLBB_kFlag == 0;
    }
    /**
     * 得到用户进入的场景值
     * 
     * @static
     * @returns {number} 
     * @memberof WudianMgr
     */
    public static GetE_JJKLBB_ntrySc_JJKLBB_ene(): boolean {
        return WXAPI.getLaunchOptionsSync().scene == 1006;
    }
    /**
     * 误点开关是否打开，包括了总开关和分时开关
     * 
     * @static
     * @returns {boolean} 
     * @memberof WudianMgr
     */
    public static IsS_JJKLBB_witchOpe_JJKLBB_n(): boolean {
        let mainSwitch = AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().wu_JJKLBB_dian == 1;
        let isOpenTime = AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().wudianTim_JJKLBB_eAvaliable;
        console.log("误点Flag状态: ", "总开关:", mainSwitch, "打开时间", isOpenTime);
        return mainSwitch && isOpenTime;
    }
    // /**
    //  * 完全封装好的误点Flag
    //  * 
    //  * @readonly
    //  * @static
    //  * @type {boolean}
    //  * @memberof WudianMgr
    //  */
    // public static get Wudia_JJKLBB_nFlag(): boolean {
    //     let mainSwitch = AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().wu_JJKLBB_dian == 1;
    //     let noEnterBySearch: boolean = WXAPI.getLaunchOptionsSync().scene != 1006;
    //     let isOpenTime = AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().wudianTim_JJKLBB_eAvaliable;
    //     let ipnotBlock = Wudi_JJKLBB_anMgr._ipBloc_JJKLBB_kFlag == 0;
    //     /* 测试功能，等删 */
    //     // ipnotBlock = true;
    //     console.log("误点Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽", ipnotBlock, "打开时间",
    //         isOpenTime);
    //     return mainSwitch && noEnterBySearch && ipnotBlock && isOpenTime;
    // }
    /**
     * 没有涉及到定时开关的wudianFlag,自行整合按照时间开关的效果
     * 
     * @static
     * @returns {boolean} 
     * @memberof WudianMgr
     */
    public static get NoTimeWu_JJKLBB_dianFlag(): boolean {
        let mainSwitch = AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().wu_JJKLBB_dian == 1;
        let noEnterBySearch: boolean = WXAPI.getLaunchOptionsSync().scene != 1006;
        let ipnotBlock = Wudi_JJKLBB_anMgr._ipBloc_JJKLBB_kFlag == 0;
        /* 测试功能，等删 */
        // ipnotBlock = true;
        console.log("误点Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽");
        return mainSwitch && noEnterBySearch && ipnotBlock;
    }

    public static get WudianFlag(): boolean {
        let mainSwitch = AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().wu_JJKLBB_dian == 1;
        let entryScene = WXAPI.getLaunchOptionsSync().scene;
        let noEnterBySearch: boolean = true;
        let sceneList = AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().wudianSceneList;
        for (let index = 0; index < sceneList.length; index++) {
            const element = sceneList[index];
            if(element == entryScene) {
                noEnterBySearch = false;
                break;
            }
        }
        let ipnotBlock = this._ipBloc_JJKLBB_kFlag == 0;
        /* 测试功能，等删 */
        // ipnotBlock = true;
        let final = mainSwitch && noEnterBySearch && ipnotBlock;
        console.log("误点Flag状态:", final,",AppSwitch.wudian开关:", mainSwitch, ",场景进入:", noEnterBySearch, ",IP未被屏蔽:", ipnotBlock);
        return mainSwitch && noEnterBySearch && ipnotBlock;
    }

    public static get FirstWudianFlag(): boolean {
        let mainSwitch = Wudi_JJKLBB_anMgr.WudianFlag;
        let secondSwitch = AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().firstWudian == 1;
        console.log("FirstWudianFlag状态:", mainSwitch && secondSwitch,",WudianFlag开关:", mainSwitch, ",分开关:",secondSwitch);
        return mainSwitch && secondSwitch;
    }

    public static get SecondWudianFlag(): boolean {
        let mainSwitch = Wudi_JJKLBB_anMgr.WudianFlag;
        let secondSwitch = AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().secondWudian == 1;
        console.log("SecondWudianFlag状态:", mainSwitch && secondSwitch,",WudianFlag开关:", mainSwitch, ",分开关:",secondSwitch);
        return mainSwitch && secondSwitch;
    }
}