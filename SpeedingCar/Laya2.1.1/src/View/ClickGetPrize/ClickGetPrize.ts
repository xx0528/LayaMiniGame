import View_wcjtn_Base from "../../View/ViewBase";
import { Event_wcjtn_Def } from "../../Event/EventDef";
import Event_wcjtn_Mgr from "../../Event/EventMgr";
import App_wcjtn_Switch_wcjtn_Config from "../../Config/AppSwitchConfig";
import Wu_wcjtn_dian_wcjtn_Mgr from "../../Mgr/WudianMgr";
import Cached_wcjtn_WX_wcjtn_BannerAd from "../../CachedWXBannerAd";
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
    View_wcjtn_Mgr.instance.openView(View_wcjtn_Def.ClickGetPrize,data);
 * 
 * @export
 * @class ClickGetPrize
 * @extends {View_wcjtn_Base}
 */
export default class Click_wcjtn_Get_wcjtn_Prize extends View_wcjtn_Base {
    constructor() {
        super();
    }
    private _click_wcjtn__Btn: Laya.Button;//给用户狂点的按钮
    private _arrow_wcjtn__Img: Laya.Image;//箭头，用于给用户提示
    private _open_wcjtn__Btn: Laya.Sprite;
    private _bannerAd_wcjtn__View: Laya.UIComponent;
    private _clickTime_wcjtn__PBar: Laya.Image;//进度条背景
    private _clickTime_wcjtn__PBar$Bar: Laya.Image;//进度条组件
    private _getPrize_wcjtn__View: Laya.UIComponent;
    private _prizeCount_wcjtn__Text: Laya.Text;
    private _confirm_wcjtn__Btn: Laya.Sprite;
    private _bg_wcjtn_: Laya.UIComponent;
    private _click_wcjtn_Progress: number;//进度条组件的宽度，注意Ide中一定要填写进度条组件的Width属性
    private _click_wcjtn_Bar_wcjtn_OriginalWidth: number;
    private _click_wcjtn_Time: number;//用来保存用户当前点击次数
    private _total_wcjtn_Click_wcjtn_Time: number;//用于计算客户总共点击了多少次按钮
    private _total_wcjtn_Click_wcjtn_Timer: number = 22;//用户一直没中套路，那么点击了这么多次都还是让他继续玩下去，不要卡死程序
    private _need_wcjtn_Click_wcjtn_Time: number = 10;//一共点多少次能够获得奖励，用于显示进度条
    private _banner_wcjtn_ClickTime: number = 7;//点多少次开始显示bannerr套路用户，可微调    
    private _prize_wcjtn_Count: number;//获得的奖励数量，需要在打开窗口时传入参数
    private _arrowUp_wcjtn_: boolean;
    private _banner_wcjtn_Clicked: boolean;
    private _compelet_wcjtn_Function: Function;
    // private _wudianLoadFlag: boolean;
    onAwake() {
        this._click_wcjtn__Btn = this.owner.getChildByName("Click_Btn") as Laya.Button;
        this._click_wcjtn__Btn.on(Laya.Event.CLICK, this, this.Button_wcjtn_Clicked);
        this._arrow_wcjtn__Img = this._click_wcjtn__Btn.getChildByName("Arrow_Img") as Laya.Image;
        this._bg_wcjtn_ = this.owner.getChildByName("BG") as Laya.UIComponent;
        this._open_wcjtn__Btn = this._bg_wcjtn_.getChildByName("Open_Btn") as Laya.Sprite;
        this._getPrize_wcjtn__View = this.owner.getChildByName("GetPrize_View") as Laya.UIComponent;
        this._prizeCount_wcjtn__Text = this._getPrize_wcjtn__View.getChildByName("PrizeCount_Text") as Laya.Text;
        this._confirm_wcjtn__Btn = this._getPrize_wcjtn__View.getChildByName("Confirm_Btn") as Laya.Sprite;
        this._getPrize_wcjtn__View.visible = false;
        this._clickTime_wcjtn__PBar = this._bg_wcjtn_.getChildByName("ClickTime_PBar") as Laya.Image;
        this._clickTime_wcjtn__PBar$Bar = this._clickTime_wcjtn__PBar.getChildByName("ClickTime_PBar$Bar") as Laya.Image;
        this._click_wcjtn_Bar_wcjtn_OriginalWidth = this._clickTime_wcjtn__PBar$Bar.width;
        this._bannerAd_wcjtn__View = this.owner.getChildByName("BannerAd_View") as Laya.UIComponent;
        this._clickTime_wcjtn__PBar$Bar.width = 0;
        this._click_wcjtn_Time = 0;
        this._total_wcjtn_Click_wcjtn_Time = 0;
        //EventMgr.instance.regOnceEvent(EventDef.AD_WudianBanner_LoadComplete, this, this.WudianLoadComplete);
    }

    onUpdate() {
        /* 箭头上下移动 */
        if (this._arrowUp_wcjtn_) {
            this._arrow_wcjtn__Img.top += Laya.timer.delta / 5;
            if (this._arrow_wcjtn__Img.top > -140) {
                this._arrowUp_wcjtn_ = false;
            }
        }
        else {
            this._arrow_wcjtn__Img.top -= Laya.timer.delta / 5;
            if (this._arrow_wcjtn__Img.top < -180) {
                this._arrowUp_wcjtn_ = true;
            }
        }
        /* 按钮不按，进度条自动退回 */
        if (!this._banner_wcjtn_Clicked) {
            let spd = 2 + (this._clickTime_wcjtn__PBar$Bar.width / this._click_wcjtn_Bar_wcjtn_OriginalWidth) * 6;
            if (this._clickTime_wcjtn__PBar$Bar.width >= spd) {
                this._clickTime_wcjtn__PBar$Bar.width -= spd;
            }
            if ((this._clickTime_wcjtn__PBar$Bar.width / this._click_wcjtn_Bar_wcjtn_OriginalWidth) + 0.1 < (this._click_wcjtn_Time / this._need_wcjtn_Click_wcjtn_Time)) {
                this._click_wcjtn_Time--;
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
    open_wcjtn_View(data?: any) {
        this._compelet_wcjtn_Function = data.Complete;
        this._prize_wcjtn_Count = data.PrizeCount;
        super.open_wcjtn_View(data);
    }
    /**
     * 用户成功获得奖励
     * 
     * @memberof ClickGetPrize
     */
    Open_wcjtn_PrizeWindow() {
        this._bg_wcjtn_.visible = false;
        let self = this;
        this._prizeCount_wcjtn__Text.text = this._prize_wcjtn_Count.toString();
        this._getPrize_wcjtn__View.visible = true;
        /* 确认按钮 */
        this._confirm_wcjtn__Btn.once(Laya.Event.CLICK, this, function () {
            if (self._compelet_wcjtn_Function) {
                self._compelet_wcjtn_Function();
            }
            self.close_wcjtn_View();
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
    Show_wcjtn_Banner() {
        console.log("AD_WudianBanner_Show");
        Cached_wcjtn_WX_wcjtn_BannerAd._wcjtn_show_wcjtn_();
    }
    /**
     * 狂点按钮逻辑
     * 
     * 
     * @memberof ClickGetPrize
     */
    Button_wcjtn_Clicked() {
        this._click_wcjtn_Time++;
        this._total_wcjtn_Click_wcjtn_Time++;
        //nanner一直没加载成功,保持进度条
        if (this._click_wcjtn_Time > this._need_wcjtn_Click_wcjtn_Time) {
            this._click_wcjtn_Time = this._need_wcjtn_Click_wcjtn_Time;
        }
        if (this._click_wcjtn_Time >= this._banner_wcjtn_ClickTime /*&& this._wudianLoadFlag*/) {
            if (this._click_wcjtn_Time >= this._need_wcjtn_Click_wcjtn_Time) {
                this._click_wcjtn_Time = this._need_wcjtn_Click_wcjtn_Time - 1;
            }
            this._banner_wcjtn_Clicked = true;
            console.log("误点Banner套路启动");
            //用户连点，出banner
            this.Show_wcjtn_Banner();
            Laya.timer.once(2000, this, function () {
                this.BannerClicked();
            });
        }
        //用户一直没被套路到，让他继续玩
        else if (this._total_wcjtn_Click_wcjtn_Time > this._total_wcjtn_Click_wcjtn_Timer) {
            console.log("用户一直没点到，放他一马", this._total_wcjtn_Click_wcjtn_Time);
            this.Banner_wcjtn_Clicked();
        }
        let progress = (this._click_wcjtn_Time / this._need_wcjtn_Click_wcjtn_Time) * this._click_wcjtn_Bar_wcjtn_OriginalWidth;
        this._clickTime_wcjtn__PBar$Bar.width = progress;
    }
    /**
     * Banner已经点击之后，让用户获得奖励
     * 
     * @memberof ClickGetPrize
     */
    Banner_wcjtn_Clicked() {
        Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.AD_Wu_wcjtn_dian_wcjtn_Banner__wcjtn_Hide);
        this._banner_wcjtn_Clicked = true;
        this._click_wcjtn_Time = this._need_wcjtn_Click_wcjtn_Time;
        this._clickTime_wcjtn__PBar$Bar.width = this._click_wcjtn_Bar_wcjtn_OriginalWidth;
        this._click_wcjtn__Btn.visible = false;
        this._open_wcjtn__Btn.visible = true;
        // this._bannerAd_View.visible = false;
        // this._bannerAd_View.active = false;
        this.Open_wcjtn_PrizeWindow();
    }

    onDestroy()
    {
        super.onDestroy();
        Cached_wcjtn_WX_wcjtn_BannerAd._wcjtn_hide_wcjtn_();
    }
}