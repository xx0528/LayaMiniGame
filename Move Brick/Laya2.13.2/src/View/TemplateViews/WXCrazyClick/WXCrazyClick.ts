import { Event_ZMDGJ_Def } from "../../../Event/EventDef";
import Event_ZMDGJ_Mgr from "../../../Event/EventMgr";
import Wu_ZMDGJ_dian_ZMDGJ_Mgr from "../../../Mgr/WudianMgr";
import WX_ZMDGJ_ADMgr, { WX_ZMDGJ_BannderAd } from "../../../Mgr/WXADMgr";
import App_ZMDGJ_Switch_ZMDGJ_Config from "../../../Config/AppSwitchConfig";
import View_ZMDGJ_Base from "../../ViewBase";

export default class WXCrazyClick extends View_ZMDGJ_Base
{
    protected _click_Btn: Laya.Button;//给用户狂点的按钮
    protected _arrow_Img: Laya.Image;//箭头，用于给用户提示
    protected _getPrize_View: Laya.UIComponent;
    protected _prizeCount_Text: Laya.Text;
    protected _confirm_Btn: Laya.Sprite;

    protected _clickBar : Laya.Clip = null;
    protected _clickBarOriginalWidth: number;
    protected _clickTime: number;//用来保存用户当前点击次数
    protected _totalClickTime: number;//用于计算客户总共点击了多少次按钮
    protected _totalClickTimer: number = 15;//用户一直没中套路，那么点击了这么多次都还是让他继续玩下去，不要卡死程序
    protected _needClickTime: number = 10;//一共点多少次能够获得奖励，用于显示进度条
    protected readonly _bannerClickTime: number = Math.floor(Math.random() * 5) + 2;//点多少次开始显示bannerr套路用户
 
    protected _arrowUp: boolean;
    protected _bannerClicked: boolean;

    protected _compeletFunction: Function;
    protected _titel: string;
    

    protected drgon: Laya.Skeleton;

    protected _banner : WX_ZMDGJ_BannderAd = null;

    onAwake() {
        super.onAwake();
        this._click_Btn = this.owner.getChildByName("Click_Btn") as Laya.Button;
        this._click_Btn.on(Laya.Event.CLICK, this, this.ButtonClicked);
        this._arrow_Img = this._click_Btn.getChildByName("Arrow_Img") as Laya.Image;
        this._getPrize_View = this.owner.getChildByName("GetPrize_View") as Laya.UIComponent;
        this._prizeCount_Text = this._getPrize_View.getChildByName("PrizeCount_Text") as Laya.Text;
        this._confirm_Btn = this._getPrize_View.getChildByName("Confirm_Btn") as Laya.Sprite;
        this._getPrize_View.visible = false;

        this._clickBar = this.owner.getChildByName("ClickBar").getChildByName("ClickBar") as Laya.Clip;
        this._clickBarOriginalWidth = this._clickBar.width;
        this._clickBar.width = 0;

        this._clickTime = 0;
        this._totalClickTime = 0;

        let self = this;
        Laya.loader.load("ClickGetPrize/quanji.png",Laya.Handler.create(this,(texture : Laya.Texture)=>
        {
            // texture.bitmap.lock = true;
            Laya.loader.load("ClickGetPrize/quanji.sk",Laya.Handler.create(this,(bytes)=>
            {
                console.log("texture",texture);
                console.log("bytes",bytes);
                let template = new Laya.Templet()
                template.parseData(texture,bytes);
                self.drgon = template.buildArmature();
                self.owner.addChild(self.drgon);
                self.drgon.x = 375;
                self.drgon.y = 610;
                self.drgon.scaleX = 2;
                self.drgon.scaleY = 2;
                self.drgon.parent.setChildIndex(self.drgon,1);
                self.drgon.play(0, true);
                console.log("quanji 加载完成!!!!",template);
            }),Laya.Handler.create(this,()=>{}),"",0,false,"",true)
        }),Laya.Handler.create(this,()=>{}),"",0,false,"",true);
    }

    add_ZMDGJ_Event()
    {
        super.add_ZMDGJ_Event();
        Laya.stage.on(Laya.Event.FOCUS_CHANGE,this,this.onFocusChange);
    }

    remove_ZMDGJ_Event()
    {
        super.remove_ZMDGJ_Event();
        Laya.stage.off(Laya.Event.FOCUS_CHANGE,this,this.onFocusChange);
    }

    onUpdate() {
        super.onUpdate();
        if (this._arrowUp) {
            this._arrow_Img.top += Laya.timer.delta / 5;
            if (this._arrow_Img.top > -140) {
                this._arrowUp = false;
            }
        }
        else {
            this._arrow_Img.top -= Laya.timer.delta / 5;
            if (this._arrow_Img.top < -180) {
                this._arrowUp = true;
            }
        }
        if (!this._bannerClicked) {
            let spd = 2 + (this._clickBar.width / this._clickBarOriginalWidth) * 4;
            if (this._clickBar.width >= spd) {
                this._clickBar.width -= spd;
            }
            if ((this._clickBar.width / this._clickBarOriginalWidth) + 0.1 < (this._clickTime / this._needClickTime)) {
                this._clickTime--;
            }
        }
    }

    open_ZMDGJ_View(data?: any) {
        this._compeletFunction = data.Complete;
        this._titel = data.titel;
        super.open_ZMDGJ_View(data);
    }

    OpenPrizeWindow() {
        let self = this;
        this._prizeCount_Text.text = this._titel;
        this._getPrize_View.visible = true;
        this._confirm_Btn.once(Laya.Event.CLICK, this, function () {
            if(null != self._banner)
            {
                self._banner._ZMDGJ_hide_ZMDGJ_();
            }
            if (self._compeletFunction) {
                self._compeletFunction();
            }
            self.close_ZMDGJ_View();
        });
    }

    ShowBanner() {
        let self = this;
        WX_ZMDGJ_ADMgr.get_ZMDGJ_Banner((banner : WX_ZMDGJ_BannderAd)=>
        {
            if(null != self._banner)
            {
                self._banner._ZMDGJ_hide_ZMDGJ_();
            }
            self._banner = banner
            if (null != self._banner) 
            {
                self._banner._ZMDGJ_show_ZMDGJ_();
            }
        });
    }

    ButtonClicked() {
        this._clickTime++;
        this._totalClickTime++;
        if(null != this.drgon)
        {
            this.drgon.play(1, false)
            this.drgon.once(Laya.Event.STOPPED, this, () => {
                this.drgon.play(0, true)
            });
        }
        if (this._clickTime > this._needClickTime) {
            this._clickTime = this._needClickTime;
        }
        if (this._clickTime >= this._bannerClickTime) {
            if (this._clickTime >= this._needClickTime) {
                this._clickTime = this._needClickTime - 1;
            }
            if (this._bannerClicked) {
                return;
            }
            this._bannerClicked = true;
            if(Wu_ZMDGJ_dian_ZMDGJ_Mgr.Wu_ZMDGJ_dian_ZMDGJ_Flag && 1 == App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wxcfg.kuang_ZMDGJ_dian_ZMDGJ_Banner)
            {
                this.ShowBanner();
            }
            Laya.timer.once(2000, this, function () {
                this.BannerClicked();
            });
        }
        else if (this._totalClickTime > this._totalClickTimer) {
            if(Wu_ZMDGJ_dian_ZMDGJ_Mgr.Wu_ZMDGJ_dian_ZMDGJ_Flag && 1 == App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wxcfg.kuang_ZMDGJ_dian_ZMDGJ_Banner)
            {
                this.ShowBanner();
            }
            this.BannerClicked();
        }
        let progress = (this._clickTime / this._needClickTime) * this._clickBarOriginalWidth;
        this._clickBar.width = progress;
    }

    BannerClicked() {
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.AD_Wu_ZMDGJ_dian_ZMDGJ_Banner__ZMDGJ_Hide);
        this._bannerClicked = true;
        this._clickTime = this._needClickTime;
        this._clickBar.width = this._clickBarOriginalWidth;
        this._click_Btn.visible = false;
        this.OpenPrizeWindow();
    }

    onDestroy() {
        super.onDestroy();
        if(null != this._banner)
        {
            this._banner._ZMDGJ_hide_ZMDGJ_();
        }
    }

    protected onFocusChange()
    {
        if(null != this.drgon)
        {
            this.drgon.play(0, true);
        }
    }
}