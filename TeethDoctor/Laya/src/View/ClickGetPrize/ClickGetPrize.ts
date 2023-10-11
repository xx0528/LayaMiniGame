import View_XYXZS_Base from "../../View/ViewBase";
import { Even_XYXZS_tDef } from "../../Event/EventDef";
import Even_XYXZS_tMgr from "../../Event/EventMgr";
import AppSwi_XYXZS_tchConfig from "../../Config/AppSwitchConfig";
import Wudi_XYXZS_anMgr from "../../Mgr/WudianMgr";
import Cached_XYXZS_WXBannerAd from "../../CachedWXBannerAd";
/**
 * 狂点窗口使用范例如下
    //首先判断狂点功能开关WudianMgr.WudianFlag是否打开，如果没打开就直接跳过整个逻辑
    WudianMgr.GetIpBlockState();//在游戏里初始化的时候调用这个方法初始化Ip屏蔽flag
    //将这段代码插入需要调用狂点窗口的地方
    let data : any = {};
    //狂点逻辑完成后的回调方法
    data.Complete = function(){
        console.log("狂点按钮结束");//在这里写入狂点窗口结束后需要调用的逻辑，例如弹出结算页面
    }
    // 完成点击之后获得的奖励数量，依照各项目不同自行实现
    data.PrizeCount = 30;
    // 在调用窗口前必须关闭当前正在显示的官方Banner广告，这个窗口才能正常运行，具体的逻辑各人需自行实现
    // 而且关闭官方Banner可以稍微提早一些，避免频繁调用出错或者不稳定
    Event_PK_Mgr.instance.dispatch(Event_PK_Def.AD_CloseBanner, true);//这句代码是我用来关闭官方Banner，各项目自行实现
    ViewMgr.instance.openView(ViewDef.ClickGetPrize,data);
 * 
 * @export
 * @class ClickGetPrize
 * @extends {View_XYXZS_Base}
 */
export default class ClickG_XYXZS_etPrize extends View_XYXZS_Base {
    constructor() {
        super();
    }
    private _cli_XYXZS_ck_Btn: Laya.Button;//给用户狂点的按钮
    private _ar_XYXZS_row_Img: Laya.Image;//箭头，用于给用户提示
    private _op_XYXZS_en_Btn: Laya.Sprite;
    private _ban_XYXZS_nerAd_View: Laya.UIComponent;
    private _cli_XYXZS_ckTime_PBar: Laya.Image;//进度条背景
    private _clic_XYXZS_kTime_PBar$Bar: Laya.Image;//进度条组件
    private _getP_XYXZS_rize_View: Laya.UIComponent;
    private _pri_XYXZS_zeCount_Text: Laya.Text;
    private _con_XYXZS_firm_Btn: Laya.Sprite;
    private _b_XYXZS_g: Laya.UIComponent;
    private _cl_XYXZS_ickProgress: number;//进度条组件的宽度，注意Ide中一定要填写进度条组件的Width属性
    private _clic_XYXZS_kBarOriginalWidth: number;
    private _cli_XYXZS_ckTime: number;//用来保存用户当前点击次数
    private _tota_XYXZS_lClickTime: number;//用于计算客户总共点击了多少次按钮
    private _totalCl_XYXZS_ickTimer: number = 22;//用户一直没中套路，那么点击了这么多次都还是让他继续玩下去，不要卡死程序
    private _needCl_XYXZS_ickTime: number = 10;//一共点多少次能够获得奖励，用于显示进度条
    private _banne_XYXZS_rClickTime: number = 7;//点多少次开始显示bannerr套路用户，可微调    
    private _pri_XYXZS_zeCount: number;//获得的奖励数量，需要在打开窗口时传入参数
    private _arr_XYXZS_owUp: boolean;
    private _bann_XYXZS_erClicked: boolean;
    private _comp_XYXZS_eletFunction: Function;
    // private _wudianLoadFlag: boolean;
    onAwake() {
        this._cli_XYXZS_ck_Btn = this.owner.getChildByName("Click_Btn") as Laya.Button;
        this._cli_XYXZS_ck_Btn.on(Laya.Event.CLICK, this, this.Butto_XYXZS_nClicked);
        this._ar_XYXZS_row_Img = this._cli_XYXZS_ck_Btn.getChildByName("Arrow_Img") as Laya.Image;
        this._b_XYXZS_g = this.owner.getChildByName("BG") as Laya.UIComponent;
        this._op_XYXZS_en_Btn = this._b_XYXZS_g.getChildByName("Open_Btn") as Laya.Sprite;
        this._getP_XYXZS_rize_View = this.owner.getChildByName("GetPrize_View") as Laya.UIComponent;
        this._pri_XYXZS_zeCount_Text = this._getP_XYXZS_rize_View.getChildByName("PrizeCount_Text") as Laya.Text;
        this._con_XYXZS_firm_Btn = this._getP_XYXZS_rize_View.getChildByName("Confirm_Btn") as Laya.Sprite;
        this._getP_XYXZS_rize_View.visible = false;
        this._cli_XYXZS_ckTime_PBar = this._b_XYXZS_g.getChildByName("ClickTime_PBar") as Laya.Image;
        this._clic_XYXZS_kTime_PBar$Bar = this._cli_XYXZS_ckTime_PBar.getChildByName("ClickTime_PBar$Bar") as Laya.Image;
        this._clic_XYXZS_kBarOriginalWidth = this._clic_XYXZS_kTime_PBar$Bar.width;
        this._ban_XYXZS_nerAd_View = this.owner.getChildByName("BannerAd_View") as Laya.UIComponent;
        this._clic_XYXZS_kTime_PBar$Bar.width = 0;
        this._cli_XYXZS_ckTime = 0;
        this._tota_XYXZS_lClickTime = 0;
        //EventMgr.instance.regOnceEvent(EventDef.AD_WudianBanner_LoadComplete, this, this.WudianLoadComplete);
    }

    onUpdate() {
        /* 箭头上下移动 */
        if (this._arr_XYXZS_owUp) {
            this._ar_XYXZS_row_Img.top += Laya.timer.delta / 5;
            if (this._ar_XYXZS_row_Img.top > -140) {
                this._arr_XYXZS_owUp = false;
            }
        }
        else {
            this._ar_XYXZS_row_Img.top -= Laya.timer.delta / 5;
            if (this._ar_XYXZS_row_Img.top < -180) {
                this._arr_XYXZS_owUp = true;
            }
        }
        /* 按钮不按，进度条自动退回 */
        if (!this._bann_XYXZS_erClicked) {
            let spd = 2 + (this._clic_XYXZS_kTime_PBar$Bar.width / this._clic_XYXZS_kBarOriginalWidth) * 6;
            if (this._clic_XYXZS_kTime_PBar$Bar.width >= spd) {
                this._clic_XYXZS_kTime_PBar$Bar.width -= spd;
            }
            if ((this._clic_XYXZS_kTime_PBar$Bar.width / this._clic_XYXZS_kBarOriginalWidth) + 0.1 < (this._cli_XYXZS_ckTime / this._needCl_XYXZS_ickTime)) {
                this._cli_XYXZS_ckTime--;
            }
        }
        // else {
        //     if (this._clickTime_PBar$Bar.width <= this._clickBarOriginalWidth) {
        //         this._clickTime_PBar$Bar.width += 2;
        //         if (this._clickTime_PBar$Bar.width > this._clickBarOriginalWidth) {
        //             this._clickTime_PBar$Bar.width = this._clickBarOriginalWidth
        //         }
        //     }
        // }
    }
    /**
     * 打开Banner
     * 
     * @param {*} [data] 
     * @memberof ClickGetPrize
     */
    openView(data?: any) {
        this._comp_XYXZS_eletFunction = data.Complete;
        this._pri_XYXZS_zeCount = data.PrizeCount;
        super.openView(data);
    }
    /**
     * 用户成功获得奖励
     * 
     * @memberof ClickGetPrize
     */
    OpenPri_XYXZS_zeWindow() {
        this._b_XYXZS_g.visible = false;
        let self = this;
        this._pri_XYXZS_zeCount_Text.text = this._pri_XYXZS_zeCount.toString();
        this._getP_XYXZS_rize_View.visible = true;
        /* 确认按钮 */
        this._con_XYXZS_firm_Btn.once(Laya.Event.CLICK, this, function () {
            if (self._comp_XYXZS_eletFunction) {
                self._comp_XYXZS_eletFunction();
            }
            self.closeView();
        });
    }
    /**
     * 误点预加载完成
     * 
     * @memberof ClickGetPrize
     */
    // WudianLoadComplete() {
    //     console.log("WudianBanner预加载完毕");
    //     this._wudianLoadFlag = true;
    // }
    /**
     * 将Banner显示
     * 
     * @memberof ClickGetPrize
     */
    ShowB_XYXZS_anner() {
        console.log("AD_WudianBanner_Show");
        Cached_XYXZS_WXBannerAd.show();
    }
    /**
     * 狂点按钮逻辑
     * 
     * 
     * @memberof ClickGetPrize
     */
    Butto_XYXZS_nClicked() {
        this._cli_XYXZS_ckTime++;
        this._tota_XYXZS_lClickTime++;
        //nanner一直没加载成功,保持进度条
        if (this._cli_XYXZS_ckTime > this._needCl_XYXZS_ickTime) {
            this._cli_XYXZS_ckTime = this._needCl_XYXZS_ickTime;
        }
        if (this._cli_XYXZS_ckTime >= this._banne_XYXZS_rClickTime /*&& this._wudianLoadFlag*/) {
            if (this._cli_XYXZS_ckTime >= this._needCl_XYXZS_ickTime) {
                this._cli_XYXZS_ckTime = this._needCl_XYXZS_ickTime - 1;
            }
            this._bann_XYXZS_erClicked = true;
            console.log("误点Banner套路启动");
            //用户连点，出banner
            this.ShowB_XYXZS_anner();
            Laya.timer.once(2000, this, function () {
                this.BannerClicked();
            });
        }
        //用户一直没被套路到，让他继续玩
        else if (this._tota_XYXZS_lClickTime > this._totalCl_XYXZS_ickTimer) {
            console.log("用户一直没点到，放他一马", this._tota_XYXZS_lClickTime);
            this.Banner_XYXZS_Clicked();
        }
        let progress = (this._cli_XYXZS_ckTime / this._needCl_XYXZS_ickTime) * this._clic_XYXZS_kBarOriginalWidth;
        this._clic_XYXZS_kTime_PBar$Bar.width = progress;
    }
    /**
     * Banner已经点击之后，让用户获得奖励
     * 
     * @memberof ClickGetPrize
     */
    Banner_XYXZS_Clicked() {
        Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.AD_WudianB_XYXZS_anner_Hide);
        this._bann_XYXZS_erClicked = true;
        this._cli_XYXZS_ckTime = this._needCl_XYXZS_ickTime;
        this._clic_XYXZS_kTime_PBar$Bar.width = this._clic_XYXZS_kBarOriginalWidth;
        this._cli_XYXZS_ck_Btn.visible = false;
        this._op_XYXZS_en_Btn.visible = true;
        // this._bannerAd_View.visible = false;
        // this._bannerAd_View.active = false;
        this.OpenPri_XYXZS_zeWindow();
    }

    onDestroy()
    {
        super.onDestroy();
        Cached_XYXZS_WXBannerAd.hide();
    }
}