import View_wcjtn_Base from "../../../View/ViewBase";
import { Event_wcjtn_Def } from "../../../Event/EventDef";
import Event_wcjtn_Mgr from "../../../Event/EventMgr";
import App_wcjtn_Switch_wcjtn_Config from "../../../Config/AppSwitchConfig";
import Wu_wcjtn_dian_wcjtn_Mgr from "../../../Mgr/WudianMgr";
import TT_wcjtn_API from "../../../TTAPI";

export default class TTCrazyClick extends View_wcjtn_Base {

    protected _click_wcjtn__Btn: Laya.Button;//给用户狂点的按钮
    protected _arrow_wcjtn__Img: Laya.Image;//箭头，用于给用户提示
    protected _getPrize_wcjtn__View: Laya.UIComponent;
    protected _prize_wcjtn_Count_Text: Laya.Text;
    protected _confirm_wcjtn__Btn: Laya.Sprite;

    protected _click_wcjtn_Bar : Laya.Clip = null;
    protected _click_wcjtn_BarOriginal_wcjtn_Width: number;
    protected _click_wcjtn_Time: number;//用来保存用户当前点击次数
    protected _total_wcjtn_Click_wcjtn_Time: number;//用于计算客户总共点击了多少次按钮
    protected _total_wcjtn_Click_wcjtn_Timer: number = 15;//用户一直没中套路，那么点击了这么多次都还是让他继续玩下去，不要卡死程序
    protected _need_wcjtn_Click_wcjtn_Time: number = 10;//一共点多少次能够获得奖励，用于显示进度条
    protected readonly _banner_wcjtn_ClickTime: number = Math.floor(Math.random() * 5) + 2;//点多少次开始显示bannerr套路用户  

    protected _arrow_wcjtn_Up: boolean;
    protected _banner_wcjtn_Clicked: boolean;

    protected _compelet_wcjtn_Function: Function;
    protected _prize_wcjtn_Count: number;
    

    protected drgon_wcjtn_: Laya.Skeleton;


    onAwake() {
        this._click_wcjtn__Btn = this.owner.getChildByName("Click_Btn") as Laya.Button;
        this._click_wcjtn__Btn.on(Laya.Event.CLICK, this, this.ButtonClicked);
        this._arrow_wcjtn__Img = this._click_wcjtn__Btn.getChildByName("Arrow_Img") as Laya.Image;
        this._getPrize_wcjtn__View = this.owner.getChildByName("GetPrize_View") as Laya.UIComponent;
        this._prize_wcjtn_Count_Text = this._getPrize_wcjtn__View.getChildByName("PrizeCount_Text") as Laya.Text;
        this._confirm_wcjtn__Btn = this._getPrize_wcjtn__View.getChildByName("Confirm_Btn") as Laya.Sprite;
        this._getPrize_wcjtn__View.visible = false;

        this._click_wcjtn_Bar = this.owner.getChildByName("ClickBar").getChildByName("ClickBar") as Laya.Clip;
        this._click_wcjtn_BarOriginal_wcjtn_Width = this._click_wcjtn_Bar.width;
        this._click_wcjtn_Bar.width = 0;

        this._click_wcjtn_Time = 0;
        this._total_wcjtn_Click_wcjtn_Time = 0;

        let self = this;
        Laya.loader.load("ClickGetPrize/quanji.png",Laya.Handler.create(this,(texture : Laya.Texture)=>
        {
            texture.bitmap.lock = true;
            Laya.loader.load("ClickGetPrize/quanji.sk",Laya.Handler.create(this,(bytes)=>
            {
                console.log("texture",texture);
                console.log("bytes",bytes);
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
            }),Laya.Handler.create(this,()=>{}),"",0,false,"",true)
        }),Laya.Handler.create(this,()=>{}),"",0,false,"",true);
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
        if (this._arrow_wcjtn_Up) {
            this._arrow_wcjtn__Img.top += Laya.timer.delta / 5;
            if (this._arrow_wcjtn__Img.top > -140) {
                this._arrow_wcjtn_Up = false;
            }
        }
        else {
            this._arrow_wcjtn__Img.top -= Laya.timer.delta / 5;
            if (this._arrow_wcjtn__Img.top < -180) {
                this._arrow_wcjtn_Up = true;
            }
        }
        if (!this._banner_wcjtn_Clicked) {
            let spd = 2 + (this._click_wcjtn_Bar.width / this._click_wcjtn_BarOriginal_wcjtn_Width) * 4;
            if (this._click_wcjtn_Bar.width >= spd) {
                this._click_wcjtn_Bar.width -= spd;
            }
            if ((this._click_wcjtn_Bar.width / this._click_wcjtn_BarOriginal_wcjtn_Width) + 0.1 < (this._click_wcjtn_Time / this._need_wcjtn_Click_wcjtn_Time)) {
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
            TT_wcjtn_API.hideBanner();
            if (self._compelet_wcjtn_Function) {
                self._compelet_wcjtn_Function();
            }
            self.close_wcjtn_View();
        });
    }

    Show_wcjtn_Banner() {
        if(App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().tt_wcjtn_cfg.kuang_wcjtn_dian_wcjtn_Banner == 1)
        {
            TT_wcjtn_API.show_wcjtn_Banner();
        }
    }

    ButtonClicked() {
        this._click_wcjtn_Time++;
        this._total_wcjtn_Click_wcjtn_Time++;
        if(null != this.drgon_wcjtn_)
        {
            this.drgon_wcjtn_.play(1, false)
            this.drgon_wcjtn_.once(Laya.Event.STOPPED, this, () => {
                this.drgon_wcjtn_.play(0, true)
            });
        }
        if (this._click_wcjtn_Time > this._need_wcjtn_Click_wcjtn_Time) {
            this._click_wcjtn_Time = this._need_wcjtn_Click_wcjtn_Time;
        }
        if (this._click_wcjtn_Time >= this._banner_wcjtn_ClickTime) {
            if (this._click_wcjtn_Time >= this._need_wcjtn_Click_wcjtn_Time) {
                this._click_wcjtn_Time = this._need_wcjtn_Click_wcjtn_Time - 1;
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
        else if (this._total_wcjtn_Click_wcjtn_Time > this._total_wcjtn_Click_wcjtn_Timer) {
            this.Show_wcjtn_Banner();
            this.Banner_wcjtn_Clicked();
        }
        let progress = (this._click_wcjtn_Time / this._need_wcjtn_Click_wcjtn_Time) * this._click_wcjtn_BarOriginal_wcjtn_Width;
        this._click_wcjtn_Bar.width = progress;
    }

    Banner_wcjtn_Clicked() {
        Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.AD_Wu_wcjtn_dian_wcjtn_Banner__wcjtn_Hide);
        this._banner_wcjtn_Clicked = true;
        this._click_wcjtn_Time = this._need_wcjtn_Click_wcjtn_Time;
        this._click_wcjtn_Bar.width = this._click_wcjtn_BarOriginal_wcjtn_Width;
        this._click_wcjtn__Btn.visible = false;
        this.Open_wcjtn_Prize_wcjtn_Window();
    }

    onDestroy() {
        TT_wcjtn_API.hideBanner();
    }

    protected onFocusChange()
    {
        if(null != this.drgon_wcjtn_)
        {
            this.drgon_wcjtn_.play(0, true);
        }
    }
}