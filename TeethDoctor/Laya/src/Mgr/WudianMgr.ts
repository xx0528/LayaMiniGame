import Http_XYXZS_Unit from "../Net/HttpUnit";
import AppSwi_XYXZS_tchConfig from "../Config/AppSwitchConfig";
import W_XYXZS_XAPI from "../WXAPI";
import QQMini_XYXZS_GameAPI from "../QQMiniGameAPI";

export default class Wudi_XYXZS_anMgr {
    private static _ipBlo_XYXZS_ckFlag: number = -1;
    public static IpBl_XYXZS_ockFlag(): number {
        return Wudi_XYXZS_anMgr._ipBlo_XYXZS_ckFlag;
    }
    /**
     * 此方法调用很慢，所以要在游戏初始化的时候调用一次此方法
     * 
     * @static
     * @memberof WudianMgr
     */
    public static Update_XYXZS_IpBlockState() {
        Http_XYXZS_Unit.GetI_XYXZS_pBlock(
            function (res) {
                console.log("调用IpBlock接口成功,结果为:", res);
                Wudi_XYXZS_anMgr._ipBlo_XYXZS_ckFlag = res.code;
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
    public static GetI_XYXZS_pBlocked(): boolean {
        return Wudi_XYXZS_anMgr._ipBlo_XYXZS_ckFlag == 0;
    }
    /**
     * 得到用户进入的场景值
     * 
     * @static
     * @returns {number} 
     * @memberof WudianMgr
     */
    public static GetEntry_XYXZS_Scene(): boolean {
        return W_XYXZS_XAPI.getLaun_XYXZS_chOptionsSync().scene == 1006;
    }
    /**
     * 误点开关是否打开，包括了总开关和分时开关
     * 
     * @static
     * @returns {boolean} 
     * @memberof WudianMgr
     */
    public static IsSwi_XYXZS_tchOpen(): boolean {
        let mainSwitch = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().wu_XYXZS_dian == 1;
        let isOpenTime = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().wudianTi_XYXZS_meAvaliable;
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
    public static get Wud_XYXZS_ianFlag(): boolean {
        let mainSwitch = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().wu_XYXZS_dian == 1;

        let launchScene = null;
        if(Laya.Browser.onMiniGame)
        {
            launchScene = W_XYXZS_XAPI.getLaun_XYXZS_chOptionsSync().scene;
        }
        else if(Laya.Browser.onQQMiniGame)
        {
            launchScene = QQMini_XYXZS_GameAPI.getLaunc_XYXZS_hOptionsSync().scene;
        }

        let noEnterBySearch: boolean = true;
        var wudianSceneList = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().wudia_XYXZS_nSceneList;
        for (var i = 0; i < wudianSceneList.length; ++i)  
        {
            var wudianSceneValue = wudianSceneList[i];
            if(launchScene == wudianSceneValue)
            {
                noEnterBySearch = false;
            }
        }
        let isOpenTime = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().wudianTi_XYXZS_meAvaliable;
        let ipnotBlock = Wudi_XYXZS_anMgr._ipBlo_XYXZS_ckFlag == 0;
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
    public static get NoTimeW_XYXZS_udianFlag(): boolean {
        let mainSwitch = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().wu_XYXZS_dian == 1;
        let launchScene = null;
        if(Laya.Browser.onMiniGame)
        {
            launchScene = W_XYXZS_XAPI.getLaun_XYXZS_chOptionsSync().scene;
        }
        else if(Laya.Browser.onQQMiniGame)
        {
            launchScene = QQMini_XYXZS_GameAPI.getLaunc_XYXZS_hOptionsSync().scene;
        }
        
        let noEnterBySearch: boolean = true;
        var wudianSceneList = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().wudia_XYXZS_nSceneList;
        for (var i = 0; i < wudianSceneList.length; ++i)  
        {
            var wudianSceneValue = wudianSceneList[i];
            if(launchScene == wudianSceneValue)
            {
                noEnterBySearch = false;
            }
        }
        let ipnotBlock = Wudi_XYXZS_anMgr._ipBlo_XYXZS_ckFlag == 0;
        /* 测试功能，等删 */
        // ipnotBlock = true;
        console.log("误点Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽");
        return mainSwitch && noEnterBySearch && ipnotBlock;
    }

    public static get FakeExportBtn() : boolean{
        let mainSwitch = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().fakeBtn == 1;

        let launchScene = null;
        if(Laya.Browser.onMiniGame)
        {
            launchScene = W_XYXZS_XAPI.getLaun_XYXZS_chOptionsSync().scene;
        }
        else if(Laya.Browser.onQQMiniGame)
        {
            launchScene = QQMini_XYXZS_GameAPI.getLaunc_XYXZS_hOptionsSync().scene;
        }

        let noEnterBySearch: boolean = true;
        var wudianSceneList = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().wudia_XYXZS_nSceneList;
        for (var i = 0; i < wudianSceneList.length; ++i)  
        {
            var wudianSceneValue = wudianSceneList[i];
            if(launchScene == wudianSceneValue)
            {
                noEnterBySearch = false;
            }
        }
        let ipnotBlock = Wudi_XYXZS_anMgr._ipBlo_XYXZS_ckFlag == 0;
        /* 测试功能，等删 */
        // ipnotBlock = true;
        console.log("伪退出Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽", ipnotBlock);
        return mainSwitch && noEnterBySearch && ipnotBlock;
    }
}