import ryw_ViewBase from "../../../View/ViewBase";
import { ryw_EventDef } from "../../../Event/EventDef";
import ryw_EventMgr from "../../../Event/EventMgr";
import ryw_AppSwitchConfig from "../../../Config/AppSwitchConfig";
import ryw_WudianMgr from "../../../Mgr/WudianMgr";
import ryw_CachedWXBannerAd from "../../../CachedWXBannerAd";
import ryw_QQMiniGameAPI from "../../../QQMiniGameAPI";
import ryw_AppConfig from "../../../AppConfig";

export default class ryw_QQCrazyClick2 extends ryw_ViewBase {

    protected ryw__getPrize_View: Laya.UIComponent;
    protected ryw__prizeCount_Text: Laya.Text;
    protected ryw__confirm_Btn: Laya.Sprite;

    protected ryw__clickBar : Laya.Clip = null;
    protected ryw__clickBarOriginalWidth: number;
    protected ryw__clickTime: number;//用来保存用户当前点击次数
    protected ryw__totalClickTime: number;//用于计算客户总共点击了多少次按钮
    protected ryw__totalClickTimer: number = 15;//用户一直没中套路，那么点击了这么多次都还是让他继续玩下去，不要卡死程序
    protected ryw__needClickTime: number = 10;//一共点多少次能够获得奖励，用于显示进度条
    protected readonly ryw__bannerClickTime: number = Math.floor(Math.random() * 5) + 2;//点多少次开始显示bannerr套路用户 

    protected ryw__arrowUp: boolean;
    protected ryw__bannerClicked: boolean;

    protected ryw__compeletFunction: Function;
    protected ryw__prizeCount: number;
    

    protected ryw_drgon: Laya.Skeleton;
    protected ryw__clickBtn : Laya.Clip = null;


    onAwake() {
        this.ryw__getPrize_View = this.owner.getChildByName("GetPrize_View") as Laya.UIComponent;
        this.ryw__prizeCount_Text = this.ryw__getPrize_View.getChildByName("PrizeCount_Text") as Laya.Text;
        this.ryw__confirm_Btn = this.ryw__getPrize_View.getChildByName("Confirm_Btn") as Laya.Sprite;
        this.ryw__getPrize_View.visible = false;

        this.ryw__clickBar = this.owner.getChildByName("ClickBar").getChildByName("ClickBar") as Laya.Clip;
        this.ryw__clickBarOriginalWidth = this.ryw__clickBar.width;
        this.ryw__clickBar.width = 0;

        this.ryw__clickTime = 0;
        this.ryw__totalClickTime = 0;

        let self = this;
        Laya.loader.load("ClickGetPrize/quanji.png",Laya.Handler.create(self,(texture : Laya.Texture)=>
        {
            // texture.bitmap.lock = true;
            Laya.loader.load("ClickGetPrize/quanji.sk",Laya.Handler.create(self,(bytes)=>
            {
                let template = new Laya.Templet()
                template.parseData(texture,bytes);
                self.ryw_drgon = template.buildArmature();
                self.owner.addChild(self.ryw_drgon);
                self.ryw_drgon.x = 375;
                self.ryw_drgon.y = 610;
                self.ryw_drgon.scaleX = 2;
                self.ryw_drgon.scaleY = 2;
                self.ryw_drgon.parent.setChildIndex(self.ryw_drgon,1);
                self.ryw_drgon.play(0, true);
                console.log("quanji 加载完成!!!!",template);
            }),Laya.Handler.create(self,()=>{}),"",0,false,"",true)
        }),Laya.Handler.create(self,()=>{}),"",0,false,"",true);

        Laya.loader.load("ClickGetPrize/NewProject.png",Laya.Handler.create(self,(texture : Laya.Texture)=>
        {
            // texture.bitmap.lock = true;
            Laya.loader.load("ClickGetPrize/NewProject.sk",Laya.Handler.create(self,(bytes)=>
            {
                let template = new Laya.Templet()
                template.parseData(texture,bytes);
                let finger = template.buildArmature();
                self.owner.addChild(finger);
                finger.x = 360;
                finger.y = 617;
                finger.parent.setChildIndex(finger,2);
                finger.play(0, true);

                self.ryw__clickBtn = new Laya.Clip();
                self.owner.addChild(self.ryw__clickBtn);
                self.ryw__clickBtn.x = 360 - 100,
                self.ryw__clickBtn.y = 617 - 100,
                self.ryw__clickBtn.width = 200,
                self.ryw__clickBtn.height = 200,
                self.ryw__clickBtn.parent.setChildIndex(self.ryw__clickBtn,3);
                self.ryw__clickBtn.on(Laya.Event.CLICK, self, self.ButtonClicked);
                console.log("手指动画 加载完成!!!!",template);
            }),Laya.Handler.create(self,()=>{}),"",0,false,"",true)
        }),Laya.Handler.create(self,()=>{}),"",0,false,"",true);
    }

    ryw_addEvent()
    {
        super.ryw_addEvent();
        Laya.stage.on(Laya.Event.FOCUS_CHANGE,this,this.onFocusChange);
    }

    ryw_removeEvent()
    {
        super.ryw_removeEvent();
        Laya.stage.off(Laya.Event.FOCUS_CHANGE,this,this.onFocusChange);
    }

    onUpdate() {
        if (!this.ryw__bannerClicked) {
            let spd = 2 + (this.ryw__clickBar.width / this.ryw__clickBarOriginalWidth) * 4;
            if (this.ryw__clickBar.width >= spd) {
                this.ryw__clickBar.width -= spd;
            }
            if ((this.ryw__clickBar.width / this.ryw__clickBarOriginalWidth) + 0.1 < (this.ryw__clickTime / this.ryw__needClickTime)) {
                this.ryw__clickTime--;
            }
        }
    }

    ryw_openView(data?: any) {
        this.ryw__compeletFunction = data.Complete;
        this.ryw__prizeCount = data.PrizeCount;
        super.ryw_openView(data);
    }

    ryw_OpenPrizeWindow() {
        let self = this;
        this.ryw__prizeCount_Text.text = this.ryw__prizeCount.toString();
        this.ryw__getPrize_View.visible = true;
        this.ryw__confirm_Btn.once(Laya.Event.CLICK, this, function () {
            if (self.ryw__compeletFunction) {
                self.ryw__compeletFunction();
            }
            self.ryw_closeView();
        });
    }

    ryw_ShowBanner() {
        if(ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_qqcfg.ryw_kuangdianBox == 1
            && ryw_AppConfig.ryw_Versions == ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_qqcfg.ryw_qqversions)
        {
            ryw_QQMiniGameAPI.ryw_showAppBoxAd(()=>
            {
                
            });
        }
    }

    ButtonClicked() {
        this.ryw__clickTime++;
        this.ryw__totalClickTime++;
        if(null != this.ryw_drgon)
        {
            this.ryw_drgon.play(1, false)
            this.ryw_drgon.once(Laya.Event.STOPPED, this, () => {
                this.ryw_drgon.play(0, true)
            });
        }
        if (this.ryw__clickTime > this.ryw__needClickTime) {
            this.ryw__clickTime = this.ryw__needClickTime;
        }
        if (this.ryw__clickTime >= this.ryw__bannerClickTime) {
            if (this.ryw__clickTime >= this.ryw__needClickTime) {
                this.ryw__clickTime = this.ryw__needClickTime - 1;
            }
            if (this.ryw__bannerClicked) {
                return;
            }
            this.ryw__bannerClicked = true;
            this.ryw_ShowBanner();
            Laya.timer.once(2000, this, function () {
                this.ryw_BannerClicked();
            });
        }
        else if (this.ryw__totalClickTime > this.ryw__totalClickTimer) {
            this.ryw_ShowBanner();
            this.ryw_BannerClicked();
        }
        let progress = (this.ryw__clickTime / this.ryw__needClickTime) * this.ryw__clickBarOriginalWidth;
        this.ryw__clickBar.width = progress;
    }

    ryw_BannerClicked() {
        ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_AD_WudianBanner_Hide);
        this.ryw__bannerClicked = true;
        this.ryw__clickTime = this.ryw__needClickTime;
        this.ryw__clickBar.width = this.ryw__clickBarOriginalWidth;
        this.ryw__clickBtn.visible = false;
        this.ryw_OpenPrizeWindow();
    }

    onDestroy() {

    }

    protected onFocusChange()
    {
        if(null != this.ryw_drgon)
        {
            this.ryw_drgon.play(0, true);
        }
    }
}