import Wu_wcjtn_dian_wcjtn_Mgr from "../../../Mgr/WudianMgr";
import App_wcjtn_Switch_wcjtn_Config from "../../../Config/AppSwitchConfig";
import WXADMgr, { WX_wcjtn_BannderAd } from "../../../Mgr/WXADMgr";
import Utilit_wcjtn_ from "../../../Utilit";
import QQ_wcjtn_Template_wcjtn_ViewBase from "../QQTemplateViewBase";
import QQ_wcjtn_Mini_wcjtn_GameAPI from "../../../QQMiniGameAPI";
import App_wcjtn_Config from "../../../AppConfig";

export default class QQ_wcjtn_GameWinView_wcjtn_Template extends QQ_wcjtn_Template_wcjtn_ViewBase
{
    protected _center_wcjtn_Zone : Laya.Clip = null;
    protected _back_wcjtn_Btn : Laya.Sprite = null;
    protected _next_wcjtn_Btn : Laya.Sprite = null;
    
    protected _click_wcjtn_Tag : boolean = false;
    protected _click_wcjtn_TimingTag : boolean = false;

    
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
    }

    onStart()
    {
        super.onStart();
        let self = this;
        if(Wu_wcjtn_dian_wcjtn_Mgr.Wu_wcjtn_dian_wcjtn_Flag && App_wcjtn_Config.Versions_wcjtn_ == App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().qq_wcjtn_cfg.qq_wcjtn_versions)
        {
            if(1 == App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().qq_wcjtn_cfg.wei_wcjtn_yi) 
            {
                let yPos = this._center_wcjtn_Zone.height - 150;
                this._back_wcjtn_Btn.y = yPos;
                this._next_wcjtn_Btn.y = yPos;
            }
            let excute = function()
            {
                var btnMoveTimer = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().btn_wcjtn_Move_wcjtn_Timer;
                var bannerMoveTimer = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Move_wcjtn_Timer;
                Laya.timer.once(bannerMoveTimer * 1000, self, self.Banner_wcjtn_Up);
                Laya.timer.once(btnMoveTimer * 1000, self, self.Btn_wcjtn_Up);
            }
            if (App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().qq_wcjtn_cfg.box == 1)  
            {
                QQ_wcjtn_Mini_wcjtn_GameAPI.show_wcjtn_App_wcjtn_BoxAd(() =>  
                {
                    excute();
                }, () =>  
                {
                    excute();
                })
            }
            else
            {
                excute();
            }
        }
    }

    add_wcjtn_Event()
    {
        super.add_wcjtn_Event();
        this._back_wcjtn_Btn.on(Laya.Event.CLICK,this,this.on_wcjtn_Back_wcjtn_Btn);
        this._next_wcjtn_Btn.on(Laya.Event.CLICK,this,this.on_wcjtn_Next_wcjtn_Btn);
    }

    remove_wcjtn_Event()
    {
        super.remove_wcjtn_Event();
        this._back_wcjtn_Btn.off(Laya.Event.CLICK,this,this.on_wcjtn_Back_wcjtn_Btn);
        this._next_wcjtn_Btn.off(Laya.Event.CLICK,this,this.on_wcjtn_Next_wcjtn_Btn);
    }

    protected on_wcjtn_Back_wcjtn_Btn()
    {
        if(!this._click_wcjtn_Tag && Wu_wcjtn_dian_wcjtn_Mgr.Wu_wcjtn_dian_wcjtn_Flag)
        {
            var self = this
            if(!this._click_wcjtn_TimingTag)
            {
                this._click_wcjtn_TimingTag = true
                var btnMoveTimer = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().btn_wcjtn_Move_wcjtn_Timer;
                var bannerMoveTimer = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Move_wcjtn_Timer;
                Laya.timer.once(bannerMoveTimer * 1000,this,this.Banner_wcjtn_Up);
                Laya.timer.once(btnMoveTimer * 1000,this,this.Btn_wcjtn_Up);
            }
            return;
        }

        //todo:你的代码
    }

    protected on_wcjtn_Next_wcjtn_Btn()
    {
        if(!this._click_wcjtn_Tag && Wu_wcjtn_dian_wcjtn_Mgr.Wu_wcjtn_dian_wcjtn_Flag)
        {
            var self = this
            if(!this._click_wcjtn_TimingTag)
            {
                this._click_wcjtn_TimingTag = true
                var btnMoveTimer = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().btn_wcjtn_Move_wcjtn_Timer;
                var bannerMoveTimer = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Move_wcjtn_Timer;
                Laya.timer.once(bannerMoveTimer * 1000,this,this.Banner_wcjtn_Up);
                Laya.timer.once(btnMoveTimer * 1000,this,this.Btn_wcjtn_Up);
            }
            return;
        }

        //todo:你的代码
    }

    protected Banner_wcjtn_Up()
    {
        //todo：显示Banner
    }

    protected Btn_wcjtn_Up()
    {
        this._click_wcjtn_Tag = true;
        this._back_wcjtn_Btn.y = 720;
        this._next_wcjtn_Btn.y = 720;
    }

    onDestroy()
    {
        //todo：隐藏Banner
    }
}