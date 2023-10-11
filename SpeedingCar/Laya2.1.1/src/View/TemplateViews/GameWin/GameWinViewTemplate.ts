import Template_wcjtn_View_wcjtn_Base from "../TemplateViewBase";
import WX_wcjtn_ADMgr, { WX_wcjtn_BannderAd } from "../../../Mgr/WXADMgr";
import Wu_wcjtn_dian_wcjtn_Mgr from "../../../Mgr/WudianMgr";
import App_wcjtn_Switch_wcjtn_Config from "../../../Config/AppSwitchConfig";
import KRQ_Roll_wcjtn_Single_wcjtn_Ad from "../../../KRQ/Com/KRQ_RollSingleAd";
import Utilit_wcjtn_ from "../../../Utilit";
import View_wcjtn_Mgr, { View_wcjtn_Def } from "../../../Mgr/ViewMgr";
import Mini_wcjtn_Game_wcjtn_View_wcjtn_Template from "../MiniGame/MiniGameViewTemplate";

export default class Game_wcjtn_Win_wcjtn_ViewTemplate extends Template_wcjtn_View_wcjtn_Base
{
    protected _center_wcjtn_Zone : Laya.Clip = null;
    protected _back_wcjtn_Btn : Laya.Sprite = null;
    protected _next_wcjtn_Btn : Laya.Sprite = null;
    protected _roll_wcjtn_SingleAds : Array<KRQ_Roll_wcjtn_Single_wcjtn_Ad> = new Array<KRQ_Roll_wcjtn_Single_wcjtn_Ad>();
    
    protected _click_wcjtn_Tag : boolean = false;
    protected _click_wcjtn_TimingTag : boolean = false;

    protected _banner : WX_wcjtn_BannderAd = null;

    
    onAwake()
    {
        super.onAwake();
        this._center_wcjtn_Zone = this.View_wcjtn_.getChildByName("CenterZone") as Laya.Clip;
        if(Utilit_wcjtn_.is_wcjtn_IphoneX())
        {
            this._center_wcjtn_Zone.top =  this._center_wcjtn_Zone.top + 75;
        }

        this._back_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("BackBtn") as Laya.Sprite;
        this._next_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("NextBtn") as Laya.Sprite;

        for (let i = 0; i < this._center_wcjtn_Zone.numChildren; ++i) 
        {
            let ad = this._center_wcjtn_Zone.getChildAt(i).getComponent(KRQ_Roll_wcjtn_Single_wcjtn_Ad) as KRQ_Roll_wcjtn_Single_wcjtn_Ad;
            if (null == ad)
                continue;
            this._roll_wcjtn_SingleAds.push(ad);
        }

        if(Wu_wcjtn_dian_wcjtn_Mgr.Wu_wcjtn_dian_wcjtn_Flag)
        {
            this.History_wcjtn_Btn.visible = false;
        }
    }

    onStart()
    {
        super.onStart();
        if(Wu_wcjtn_dian_wcjtn_Mgr.Wu_wcjtn_dian_wcjtn_Flag)
        {
            let yPos = this._center_wcjtn_Zone.height - 150;
            this._back_wcjtn_Btn.y = yPos;
            this._next_wcjtn_Btn.y = yPos;
        }

        for (let i = 0; i < this._roll_wcjtn_SingleAds.length; ++i)  
        {
            let ad = this._roll_wcjtn_SingleAds[i];
            Laya.timer.once(150,this,()=>
            {
                ad.play_wcjtn_Ani();
            })
        }

        var btnMoveTimer = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().btn_wcjtn_Move_wcjtn_Timer;
        var bannerMoveTimer = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Move_wcjtn_Timer;
        Laya.timer.once(bannerMoveTimer * 1000,this,this.BannerUp);
        Laya.timer.once(btnMoveTimer * 1000,this,this.BtnUp);
    }

    add_wcjtn_Event()
    {
        super.add_wcjtn_Event();
        this._back_wcjtn_Btn.on(Laya.Event.CLICK,this,this.onBack_wcjtn_Btn);
        this._next_wcjtn_Btn.on(Laya.Event.CLICK,this,this.onNext_wcjtn_Btn);
    }

    remove_wcjtn_Event()
    {
        super.remove_wcjtn_Event();
        this._back_wcjtn_Btn.off(Laya.Event.CLICK,this,this.onBack_wcjtn_Btn);
        this._next_wcjtn_Btn.off(Laya.Event.CLICK,this,this.onNext_wcjtn_Btn);
    }

    protected onBack_wcjtn_Btn()
    {
        if(!this._click_wcjtn_Tag && Wu_wcjtn_dian_wcjtn_Mgr.Wu_wcjtn_dian_wcjtn_Flag)
        {
            var self = this
            if(!this._click_wcjtn_TimingTag)
            {
                this._click_wcjtn_TimingTag = true
                var btnMoveTimer = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().btn_wcjtn_Move_wcjtn_Timer;
                var bannerMoveTimer = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Move_wcjtn_Timer;
                Laya.timer.once(bannerMoveTimer * 1000,this,this.BannerUp);
                Laya.timer.once(btnMoveTimer * 1000,this,this.BtnUp);
            }
            return;
        }

        //todo:你的代码
        this.close_wcjtn_View();
        View_wcjtn_Mgr.ins_wcjtn_tance.open_wcjtn_View(View_wcjtn_Def.Export2View);
    }

    protected onNext_wcjtn_Btn()
    {
        if(!this._click_wcjtn_Tag && Wu_wcjtn_dian_wcjtn_Mgr.Wu_wcjtn_dian_wcjtn_Flag)
        {
            var self = this
            if(!this._click_wcjtn_TimingTag)
            {
                this._click_wcjtn_TimingTag = true
                var btnMoveTimer = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().btn_wcjtn_Move_wcjtn_Timer;
                var bannerMoveTimer = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Move_wcjtn_Timer;
                Laya.timer.once(bannerMoveTimer * 1000,this,this.BannerUp);
                Laya.timer.once(btnMoveTimer * 1000,this,this.BtnUp);
            }
            return;
        }

        //todo:你的代码
        this.close_wcjtn_View();
        // View_wcjtn_Mgr.ins_wcjtn_tance.open_wcjtn_View(View_wcjtn_Def.Export2View);        
        View_wcjtn_Mgr.ins_wcjtn_tance.open_wcjtn_View(View_wcjtn_Def.MyMainView);
    }

    protected BannerUp()
    {
        let self = this;
        WX_wcjtn_ADMgr.get_wcjtn_Banner((banner : WX_wcjtn_BannderAd)=>
        {
            if(null != self._banner)
            {
                this._banner._wcjtn_hide_wcjtn_();
            }
            self._banner = banner
            if (null != self._banner) 
            {
                this._banner._wcjtn_show_wcjtn_();
            }
            if(this.is_wcjtn_Show_wcjtn_HistoryBtn)
            {
                self.History_wcjtn_Btn.visible = true;
            }
        });
    }

    protected BtnUp()
    {
        this._click_wcjtn_Tag = true;
        this._back_wcjtn_Btn.y = 720;
        this._next_wcjtn_Btn.y = 720;
    }

    onDestroy()
    {
        if(null != this._banner)
        {
            this._banner._wcjtn_hide_wcjtn_();
        }
        this._banner = null;
    }

    protected on_wcjtn_History_wcjtn_Btn()
    {
        let self = this;
        View_wcjtn_Mgr.ins_wcjtn_tance.open_wcjtn_View(View_wcjtn_Def.MiniGameView,null,(v : Mini_wcjtn_Game_wcjtn_View_wcjtn_Template)=>
        {
            self.hide_wcjtn_();
            if(null != self._banner)
            {
                self._banner._wcjtn_hide_wcjtn_();
            }
            v.on_wcjtn_CloseEvent = ()=>
            {
                if(null != self.View_wcjtn_ && !self.View_wcjtn_.destroyed)
                {
                    self.show_wcjtn_();
                    if(null != self._banner)
                    {
                        self._banner._wcjtn_show_wcjtn_();
                    }
                }
            }
        })
    }
}