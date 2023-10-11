import ViewBase from "../../../View/ViewBase";
import { Event_ppxhc_Def } from "../../../Event/EventDef";
import EventMgr from "../../../Event/EventMgr";
import AppSwitchConfig from "../../../Config/AppSwitchConfig";
import WudianMgr from "../../../Mgr/WudianMgr";
import TTAPI from "../../../TTAPI";

export default class TTCrazyClick_ppxhc extends ViewBase {

    protected _click_Btn_ppxhc: Laya.Button;//给用户狂点的按钮
    protected _arrow_Img_ppxhc: Laya.Image;//箭头，用于给用户提示
    protected _getPrize_View_ppxhc: Laya.UIComponent;
    protected _prizeCount_Text_ppxhc: Laya.Text;
    protected _confirm_Btn_ppxhc: Laya.Sprite;

    protected _clickBar_ppxhc : Laya.Clip = null;
    protected _clickBarOriginalWidth_ppxhc: number;
    protected _clickTime_ppxhc: number;//用来保存用户当前点击次数
    protected _totalClickTime: number;//用于计算客户总共点击了多少次按钮
    protected _totalClickTimer_ppxhc: number = 15;//用户一直没中套路，那么点击了这么多次都还是让他继续玩下去，不要卡死程序
    protected _needClickTime_ppxhc: number = 10;//一共点多少次能够获得奖励，用于显示进度条
    protected readonly _bannerClickTime_ppxhc: number = Math.floor(Math.random() * 5) + 2;//点多少次开始显示bannerr套路用户   

    protected _arrowUp_ppxhc: boolean;
    protected _bannerClicked_ppxhc: boolean;

    protected _compeletFunction_ppxhc: Function;
    protected _prizeCount_ppxhc: number;
    

    protected drgon: Laya.Skeleton;


    onAwake() {
        this.drgon = this.owner.getChildByName("panch") as Laya.Skeleton
        this._click_Btn_ppxhc = this.owner.getChildByName("Click_Btn") as Laya.Button;
        this._click_Btn_ppxhc.on(Laya.Event.CLICK, this, this.ButtonClicked);
        this._arrow_Img_ppxhc = this._click_Btn_ppxhc.getChildByName("Arrow_Img") as Laya.Image;
        this._getPrize_View_ppxhc = this.owner.getChildByName("GetPrize_View") as Laya.UIComponent;
        this._prizeCount_Text_ppxhc = this._getPrize_View_ppxhc.getChildByName("PrizeCount_Text") as Laya.Text;
        this._confirm_Btn_ppxhc = this._getPrize_View_ppxhc.getChildByName("Confirm_Btn") as Laya.Sprite;
        this._getPrize_View_ppxhc.visible = false;

        this._clickBar_ppxhc = this.owner.getChildByName("ClickBar").getChildByName("ClickBar") as Laya.Clip;
        this._clickBarOriginalWidth_ppxhc = this._clickBar_ppxhc.width;
        this._clickBar_ppxhc.width = 0;

        this._clickTime_ppxhc = 0;
        this._totalClickTime = 0;

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

    addEvent()
    {
        super.addEvent();
        Laya.stage.on(Laya.Event.FOCUS_CHANGE,this,this.onFocusChange);
    }

    removeEvent()
    {
        super.removeEvent();
        Laya.stage.off(Laya.Event.FOCUS_CHANGE,this,this.onFocusChange);
    }

    onUpdate() {
        if (this._arrowUp_ppxhc) {
            this._arrow_Img_ppxhc.top += Laya.timer.delta / 5;
            if (this._arrow_Img_ppxhc.top > -140) {
                this._arrowUp_ppxhc = false;
            }
        }
        else {
            this._arrow_Img_ppxhc.top -= Laya.timer.delta / 5;
            if (this._arrow_Img_ppxhc.top < -180) {
                this._arrowUp_ppxhc = true;
            }
        }
        if (!this._bannerClicked_ppxhc) {
            let spd = 2 + (this._clickBar_ppxhc.width / this._clickBarOriginalWidth_ppxhc) * 4;
            if (this._clickBar_ppxhc.width >= spd) {
                this._clickBar_ppxhc.width -= spd;
            }
            if ((this._clickBar_ppxhc.width / this._clickBarOriginalWidth_ppxhc) + 0.1 < (this._clickTime_ppxhc / this._needClickTime_ppxhc)) {
                this._clickTime_ppxhc--;
            }
        }
    }

    openView(data?: any) {
        this._compeletFunction_ppxhc = data.Complete;
        this._prizeCount_ppxhc = data.PrizeCount;
        super.openView(data);
    }

    OpenPrizeWindow() {
        let self = this;
        this._prizeCount_Text_ppxhc.text = this._prizeCount_ppxhc.toString();
        this._getPrize_View_ppxhc.visible = true;
        this._confirm_Btn_ppxhc.once(Laya.Event.CLICK, this, function () {
            TTAPI.hideBanner();
            if (self._compeletFunction_ppxhc) {
                self._compeletFunction_ppxhc();
            }
            self.closeView();
        });
    }

    ShowBanner() {
        if(AppSwitchConfig.getInstance().getAppSwitchData().ttcfg.kuangdianBanner == 1)
        {
            TTAPI.showBanner();
        }
    }

    ButtonClicked() {
        this._clickTime_ppxhc++;
        this._totalClickTime++;
        if(null != this.drgon)
        {
            this.drgon.play(1, false)
            this.drgon.once(Laya.Event.STOPPED, this, () => {
                this.drgon.play(0, true)
            });
        }
        if (this._clickTime_ppxhc > this._needClickTime_ppxhc) {
            this._clickTime_ppxhc = this._needClickTime_ppxhc;
        }
        if (this._clickTime_ppxhc >= this._bannerClickTime_ppxhc) {
            if (this._clickTime_ppxhc >= this._needClickTime_ppxhc) {
                this._clickTime_ppxhc = this._needClickTime_ppxhc - 1;
            }
            if (this._bannerClicked_ppxhc) {
                return;
            }
            this._bannerClicked_ppxhc = true;
            this.ShowBanner();
            Laya.timer.once(2000, this, function () {
                this.BannerClicked();
            });
        }
        else if (this._totalClickTime > this._totalClickTimer_ppxhc) {
            this.ShowBanner();
            this.BannerClicked();
        }
        let progress = (this._clickTime_ppxhc / this._needClickTime_ppxhc) * this._clickBarOriginalWidth_ppxhc;
        this._clickBar_ppxhc.width = progress;
    }

    BannerClicked() {
        EventMgr.instance.dispatch_(Event_ppxhc_Def.AD_WudianBanner_Hide);
        this._bannerClicked_ppxhc = true;
        this._clickTime_ppxhc = this._needClickTime_ppxhc;
        this._clickBar_ppxhc.width = this._clickBarOriginalWidth_ppxhc;
        this._click_Btn_ppxhc.visible = false;
        this.OpenPrizeWindow();
    }

    onDestroy() {
        TTAPI.hideBanner();
    }

    protected onFocusChange()
    {
        if(null != this.drgon)
        {
            this.drgon.play(0, true);
        }
    }
}