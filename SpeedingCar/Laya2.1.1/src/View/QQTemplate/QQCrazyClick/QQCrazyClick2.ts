import ViewBase from "../../../View/ViewBase";
import { Event_wcjtn_Def } from "../../../Event/EventDef";
import Event_wcjtn_Mgr from "../../../Event/EventMgr";
import App_wcjtn_Switch_wcjtn_Config from "../../../Config/AppSwitchConfig";
import Wu_wcjtn_dian_wcjtn_Mgr from "../../../Mgr/WudianMgr";
import Cached_wcjtn_WX_wcjtn_BannerAd from "../../../CachedWXBannerAd";
import QQ_wcjtn_Mini_wcjtn_GameAPI from "../../../QQMiniGameAPI";
import App_wcjtn_Config from "../../../AppConfig";

export default class QQCrazyClick2 extends ViewBase {

    protected _getPrize_wcjtn__View: Laya.UIComponent;
    protected _prize_wcjtn_Count_Text: Laya.Text;
    protected _confirm_wcjtn__Btn: Laya.Sprite;

    protected _click_wcjtn_Bar : Laya.Clip = null;
    protected _click_wcjtn_BarOriginalWidth: number;
    protected _click_wcjtn_Time: number;//用来保存用户当前点击次数
    protected _total_wcjtn_ClickTime: number;//用于计算客户总共点击了多少次按钮
    protected _total_wcjtn_ClickTimer: number = 15;//用户一直没中套路，那么点击了这么多次都还是让他继续玩下去，不要卡死程序
    protected _need_wcjtn_ClickTime: number = 10;//一共点多少次能够获得奖励，用于显示进度条
    protected readonly _banner_wcjtn_ClickTime: number = Math.floor(Math.random() * 5) + 2;//点多少次开始显示bannerr套路用户   

    protected _arrow_wcjtn_Up: boolean;
    protected _banner_wcjtn_Clicked: boolean;

    protected _compelet_wcjtn_Function: Function;
    protected _prize_wcjtn_Count: number;
    

    protected drgon_wcjtn_: Laya.Skeleton;
    protected _click_wcjtn_Btn : Laya.Clip = null;


    onAwake() {
        this._getPrize_wcjtn__View = this.owner.getChildByName("GetPrize_View") as Laya.UIComponent;
        this._prize_wcjtn_Count_Text = this._getPrize_wcjtn__View.getChildByName("PrizeCount_Text") as Laya.Text;
        this._confirm_wcjtn__Btn = this._getPrize_wcjtn__View.getChildByName("Confirm_Btn") as Laya.Sprite;
        this._getPrize_wcjtn__View.visible = false;

        this._click_wcjtn_Bar = this.owner.getChildByName("ClickBar").getChildByName("ClickBar") as Laya.Clip;
        this._click_wcjtn_BarOriginalWidth = this._click_wcjtn_Bar.width;
        this._click_wcjtn_Bar.width = 0;

        this._click_wcjtn_Time = 0;
        this._total_wcjtn_ClickTime = 0;

        let self = this;
        Laya.loader.load("ClickGetPrize/quanji.png",Laya.Handler.create(self,(texture : Laya.Texture)=>
        {
            texture.bitmap.lock = true;
            Laya.loader.load("ClickGetPrize/quanji.sk",Laya.Handler.create(self,(bytes)=>
            {
                let template = new Laya.Templet()
                template.parseData(texture,bytes);
                self.drgon_wcjtn_ = template.buildArmature();
                self.owner.addChild(self.drgon_wcjtn_);
                self.drgon_wcjtn_.x = 375;
                self.drgon_wcjtn_.y = 610;
                self.drgon_wcjtn_.scaleX = 2;
                self.drgon_wcjtn_.scaleY = 2;
                self.drgon_wcjtn_.parent.setChildIndex(self.drgon_wcjtn_,1);
                self.drgon_wcjtn_.play(0, true);
                console.log("quanji 加载完成!!!!",template);
            }),Laya.Handler.create(self,()=>{}),"",0,false,"",true)
        }),Laya.Handler.create(self,()=>{}),"",0,false,"",true);

        Laya.loader.load("ClickGetPrize/NewProject.png",Laya.Handler.create(self,(texture : Laya.Texture)=>
        {
            texture.bitmap.lock = true;
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

                self._click_wcjtn_Btn = new Laya.Clip();
                self.owner.addChild(self._click_wcjtn_Btn);
                self._click_wcjtn_Btn.x = 360 - 100,
                self._click_wcjtn_Btn.y = 617 - 100,
                self._click_wcjtn_Btn.width = 200,
                self._click_wcjtn_Btn.height = 200,
                self._click_wcjtn_Btn.parent.setChildIndex(self._click_wcjtn_Btn,3);
                self._click_wcjtn_Btn.on(Laya.Event.CLICK, self, self.ButtonClicked);
                console.log("手指动画 加载完成!!!!",template);
            }),Laya.Handler.create(self,()=>{}),"",0,false,"",true)
        }),Laya.Handler.create(self,()=>{}),"",0,false,"",true);
    }

    add_wcjtn_Event()
    {
        super.add_wcjtn_Event();
        Laya.stage.on(Laya.Event.FOCUS_CHANGE,this,this.onFocusChange);
    }

    remove_wcjtn_Event()
    {
        super.remove_wcjtn_Event();
        Laya.stage.off(Laya.Event.FOCUS_CHANGE,this,this.onFocusChange);
    }

    onUpdate() {
        if (!this._banner_wcjtn_Clicked) {
            let spd = 2 + (this._click_wcjtn_Bar.width / this._click_wcjtn_BarOriginalWidth) * 4;
            if (this._click_wcjtn_Bar.width >= spd) {
                this._click_wcjtn_Bar.width -= spd;
            }
            if ((this._click_wcjtn_Bar.width / this._click_wcjtn_BarOriginalWidth) + 0.1 < (this._click_wcjtn_Time / this._need_wcjtn_ClickTime)) {
                this._click_wcjtn_Time--;
            }
        }
    }

    open_wcjtn_View(data?: any) {
        this._compelet_wcjtn_Function = data.Complete;
        this._prize_wcjtn_Count = data.PrizeCount;
        super.open_wcjtn_View(data);
    }

    Open_wcjtn_Prize_wcjtn_Window() {
        let self = this;
        this._prize_wcjtn_Count_Text.text = this._prize_wcjtn_Count.toString();
        this._getPrize_wcjtn__View.visible = true;
        this._confirm_wcjtn__Btn.once(Laya.Event.CLICK, this, function () {
            if (self._compelet_wcjtn_Function) {
                self._compelet_wcjtn_Function();
            }
            self.close_wcjtn_View();
        });
    }

    Show_wcjtn_Banner() {
        if(App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().qq_wcjtn_cfg.kuangdian_wcjtn_Box == 1
        && App_wcjtn_Config.Versions_wcjtn_ == App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().qq_wcjtn_cfg.qq_wcjtn_versions)
        {
            QQ_wcjtn_Mini_wcjtn_GameAPI.show_wcjtn_App_wcjtn_BoxAd(()=>
            {
                
            });
        }
    }

    ButtonClicked() {
        this._click_wcjtn_Time++;
        this._total_wcjtn_ClickTime++;
        if(null != this.drgon_wcjtn_)
        {
            this.drgon_wcjtn_.play(1, false)
            this.drgon_wcjtn_.once(Laya.Event.STOPPED, this, () => {
                this.drgon_wcjtn_.play(0, true)
            });
        }
        if (this._click_wcjtn_Time > this._need_wcjtn_ClickTime) {
            this._click_wcjtn_Time = this._need_wcjtn_ClickTime;
        }
        if (this._click_wcjtn_Time >= this._banner_wcjtn_ClickTime) {
            if (this._click_wcjtn_Time >= this._need_wcjtn_ClickTime) {
                this._click_wcjtn_Time = this._need_wcjtn_ClickTime - 1;
            }
            if (this._banner_wcjtn_Clicked) {
                return;
            }
            this._banner_wcjtn_Clicked = true;
            this.Show_wcjtn_Banner();
            Laya.timer.once(2000, this, function () {
                this.BannerClicked();
            });
        }
        else if (this._total_wcjtn_ClickTime > this._total_wcjtn_ClickTimer) {
            this.Show_wcjtn_Banner();
            this.Banner_wcjtn_Clicked();
        }
        let progress = (this._click_wcjtn_Time / this._need_wcjtn_ClickTime) * this._click_wcjtn_BarOriginalWidth;
        this._click_wcjtn_Bar.width = progress;
    }

    Banner_wcjtn_Clicked() {
        Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.AD_Wu_wcjtn_dian_wcjtn_Banner__wcjtn_Hide);
        this._banner_wcjtn_Clicked = true;
        this._click_wcjtn_Time = this._need_wcjtn_ClickTime;
        this._click_wcjtn_Bar.width = this._click_wcjtn_BarOriginalWidth;
        this._click_wcjtn_Btn.visible = false;
        this.Open_wcjtn_Prize_wcjtn_Window();
    }

    onDestroy() {

    }

    protected onFocusChange()
    {
        if(null != this.drgon_wcjtn_)
        {
            this.drgon_wcjtn_.play(0, true);
        }
    }
}