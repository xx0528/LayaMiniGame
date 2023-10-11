import ryw_ViewBase from "../../View/ViewBase";
import { ryw_EventDef } from "../../Event/EventDef";
import ryw_EventMgr from "../../Event/EventMgr";
import ryw_AppSwitchConfig from "../../Config/AppSwitchConfig";
import ryw_WudianMgr from "../../Mgr/WudianMgr";
import ryw_CachedWXBannerAd from "../../CachedWXBannerAd";
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
 * @extends {ryw_ViewBase}
 */
export default class ryw_ClickGetPrize extends ryw_ViewBase {
    constructor() {
        super();
    }
    private ryw__click_Btn: Laya.Button;//给用户狂点的按钮
    private ryw__arrow_Img: Laya.Image;//箭头，用于给用户提示
    private ryw__open_Btn: Laya.Sprite;
    private ryw__bannerAd_View: Laya.UIComponent;
    private ryw__clickTime_PBar: Laya.Image;//进度条背景
    private ryw__clickTime_PBar$Bar: Laya.Image;//进度条组件
    private ryw__getPrize_View: Laya.UIComponent;
    private ryw__prizeCount_Text: Laya.Text;
    private ryw__confirm_Btn: Laya.Sprite;
    private ryw__bg: Laya.UIComponent;
    private ryw__clickProgress: number;//进度条组件的宽度，注意Ide中一定要填写进度条组件的Width属性
    private ryw__clickBarOriginalWidth: number;
    private ryw__clickTime: number;//用来保存用户当前点击次数
    private ryw__totalClickTime: number;//用于计算客户总共点击了多少次按钮
    private ryw__totalClickTimer: number = 22;//用户一直没中套路，那么点击了这么多次都还是让他继续玩下去，不要卡死程序
    private ryw__needClickTime: number = 10;//一共点多少次能够获得奖励，用于显示进度条
    private ryw__bannerClickTime: number = 7;//点多少次开始显示bannerr套路用户，可微调    
    private ryw__prizeCount: number;//获得的奖励数量，需要在打开窗口时传入参数
    private ryw__arrowUp: boolean;
    private ryw__bannerClicked: boolean;
    private ryw__compeletFunction: Function;
    // private _wudianLoadFlag: boolean;
    onAwake() {
        this.ryw__click_Btn = this.owner.getChildByName("Click_Btn") as Laya.Button;
        this.ryw__click_Btn.on(Laya.Event.CLICK, this, this.ryw_ButtonClicked);
        this.ryw__arrow_Img = this.ryw__click_Btn.getChildByName("Arrow_Img") as Laya.Image;
        this.ryw__bg = this.owner.getChildByName("BG") as Laya.UIComponent;
        this.ryw__open_Btn = this.ryw__bg.getChildByName("Open_Btn") as Laya.Sprite;
        this.ryw__getPrize_View = this.owner.getChildByName("GetPrize_View") as Laya.UIComponent;
        this.ryw__prizeCount_Text = this.ryw__getPrize_View.getChildByName("PrizeCount_Text") as Laya.Text;
        this.ryw__confirm_Btn = this.ryw__getPrize_View.getChildByName("Confirm_Btn") as Laya.Sprite;
        this.ryw__getPrize_View.visible = false;
        this.ryw__clickTime_PBar = this.ryw__bg.getChildByName("ClickTime_PBar") as Laya.Image;
        this.ryw__clickTime_PBar$Bar = this.ryw__clickTime_PBar.getChildByName("ClickTime_PBar$Bar") as Laya.Image;
        this.ryw__clickBarOriginalWidth = this.ryw__clickTime_PBar$Bar.width;
        this.ryw__bannerAd_View = this.owner.getChildByName("BannerAd_View") as Laya.UIComponent;
        this.ryw__clickTime_PBar$Bar.width = 0;
        this.ryw__clickTime = 0;
        this.ryw__totalClickTime = 0;
        //EventMgr.instance.regOnceEvent(EventDef.AD_WudianBanner_LoadComplete, this, this.WudianLoadComplete);
    }

    onUpdate() {
        /* 箭头上下移动 */
        if (this.ryw__arrowUp) {
            this.ryw__arrow_Img.top += Laya.timer.delta / 5;
            if (this.ryw__arrow_Img.top > -140) {
                this.ryw__arrowUp = false;
            }
        }
        else {
            this.ryw__arrow_Img.top -= Laya.timer.delta / 5;
            if (this.ryw__arrow_Img.top < -180) {
                this.ryw__arrowUp = true;
            }
        }
        /* 按钮不按，进度条自动退回 */
        if (!this.ryw__bannerClicked) {
            let spd = 2 + (this.ryw__clickTime_PBar$Bar.width / this.ryw__clickBarOriginalWidth) * 6;
            if (this.ryw__clickTime_PBar$Bar.width >= spd) {
                this.ryw__clickTime_PBar$Bar.width -= spd;
            }
            if ((this.ryw__clickTime_PBar$Bar.width / this.ryw__clickBarOriginalWidth) + 0.1 < (this.ryw__clickTime / this.ryw__needClickTime)) {
                this.ryw__clickTime--;
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
    ryw_openView(data?: any) {
        this.ryw__compeletFunction = data.Complete;
        this.ryw__prizeCount = data.PrizeCount;
        super.ryw_openView(data);
    }
    /**
     * 用户成功获得奖励
     * 
     * @memberof ClickGetPrize
     */
    ryw_OpenPrizeWindow() {
        this.ryw__bg.visible = false;
        let self = this;
        this.ryw__prizeCount_Text.text = this.ryw__prizeCount.toString();
        this.ryw__getPrize_View.visible = true;
        /* 确认按钮 */
        this.ryw__confirm_Btn.once(Laya.Event.CLICK, this, function () {
            if (self.ryw__compeletFunction) {
                self.ryw__compeletFunction();
            }
            self.ryw_closeView();
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
    ryw_ShowBanner() {
        console.log("AD_WudianBanner_Show");
        ryw_CachedWXBannerAd.ryw_show();
    }
    /**
     * 狂点按钮逻辑
     * 
     * 
     * @memberof ClickGetPrize
     */
    ryw_ButtonClicked() {
        this.ryw__clickTime++;
        this.ryw__totalClickTime++;
        //nanner一直没加载成功,保持进度条
        if (this.ryw__clickTime > this.ryw__needClickTime) {
            this.ryw__clickTime = this.ryw__needClickTime;
        }
        if (this.ryw__clickTime >= this.ryw__bannerClickTime /*&& this._wudianLoadFlag*/) {
            if (this.ryw__clickTime >= this.ryw__needClickTime) {
                this.ryw__clickTime = this.ryw__needClickTime - 1;
            }
            this.ryw__bannerClicked = true;
            console.log("误点Banner套路启动");
            //用户连点，出banner
            this.ryw_ShowBanner();
            Laya.timer.once(2000, this, function () {
                this.ryw_BannerClicked();
            });
        }
        //用户一直没被套路到，让他继续玩
        else if (this.ryw__totalClickTime > this.ryw__totalClickTimer) {
            console.log("用户一直没点到，放他一马", this.ryw__totalClickTime);
            this.ryw_BannerClicked();
        }
        let progress = (this.ryw__clickTime / this.ryw__needClickTime) * this.ryw__clickBarOriginalWidth;
        this.ryw__clickTime_PBar$Bar.width = progress;
    }
    /**
     * Banner已经点击之后，让用户获得奖励
     * 
     * @memberof ClickGetPrize
     */
    ryw_BannerClicked() {
        ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_AD_WudianBanner_Hide);
        this.ryw__bannerClicked = true;
        this.ryw__clickTime = this.ryw__needClickTime;
        this.ryw__clickTime_PBar$Bar.width = this.ryw__clickBarOriginalWidth;
        this.ryw__click_Btn.visible = false;
        this.ryw__open_Btn.visible = true;
        // this._bannerAd_View.visible = false;
        // this._bannerAd_View.active = false;
        this.ryw_OpenPrizeWindow();
    }

    onDestroy()
    {
        super.onDestroy();
        ryw_CachedWXBannerAd.ryw_hide();
    }
}