import TemplateViewBase from "../TemplateViewBase";
import KRQ_VLoopAd from "../../../KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd";
import App_wcjtn_Switch_wcjtn_Config from "../../../Config/AppSwitchConfig";
import Utilit_wcjtn_ from "../../../Utilit";
import WX_wcjtn_ADMgr, { WX_wcjtn_BannderAd } from "../../../Mgr/WXADMgr";
import View_wcjtn_Mgr, { View_wcjtn_Def } from "../../../Mgr/ViewMgr";
import Mini_wcjtn_Game_wcjtn_View_wcjtn_Template from "../MiniGame/MiniGameViewTemplate";
import Wu_wcjtn_dian_wcjtn_Mgr from "../../../Mgr/WudianMgr";
import _wcjtn_ShareAd_wcjtn_ from "../../../ShareAd/ShareAd";

export default class Exprot3ViewTemplate extends TemplateViewBase
{
    protected _close_wcjtn_Btn : Laya.Clip = null;
    protected _krq_wcjtn_VLoopAd : KRQ_VLoopAd = null;
    protected _KRQ__wcjtn_VLoopAd : Laya.Clip = null;

    protected _click_wcjtn_Tag : boolean = false;
    protected _click_wcjtn_TimingTag : boolean = false;

    protected _banner_wcjtn_ : WX_wcjtn_BannderAd = null;

    onAwake()
    {
        super.onAwake();
        this._krq_wcjtn_VLoopAd = this.View_wcjtn_.getChildByName("KRQ_VLoopAd").getComponent(KRQ_VLoopAd);
        this._close_wcjtn_Btn = this.View_wcjtn_.getChildByName("CloseBtn") as Laya.Clip;

        this._KRQ__wcjtn_VLoopAd = this.View_wcjtn_.getChildByName("KRQ_VLoopAd") as Laya.Clip;
        if(Utilit_wcjtn_.is_wcjtn_IphoneX())
        {
            this._KRQ__wcjtn_VLoopAd.top =  this._KRQ__wcjtn_VLoopAd.top + 75;
        }
    }
    
    onStart()
    {
        this._krq_wcjtn_VLoopAd.Ad_wcjtn_Pos_wcjtn_ID = _wcjtn_ShareAd_wcjtn_.MoreGame_wcjtn_LocationID;
        super.onStart();
        if(Wu_wcjtn_dian_wcjtn_Mgr.Wu_wcjtn_dian_wcjtn_Flag)
        {
            var btnMoveTimer = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().btn_wcjtn_Move_wcjtn_Timer;
            var bannerMoveTimer = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Move_wcjtn_Timer;
            Laya.timer.once(bannerMoveTimer * 1000,this,this.Banner_wcjtn_Up);
            Laya.timer.once(btnMoveTimer * 1000,this,this.Btn_wcjtn_Up);
        }
    }

    add_wcjtn_Event()
    {
        super.add_wcjtn_Event();
        this._close_wcjtn_Btn.on(Laya.Event.CLICK,this,this.onClose_wcjtn_Btn);
    }

    remove_wcjtn_Event()
    {
        super.remove_wcjtn_Event();
        this._close_wcjtn_Btn.off(Laya.Event.CLICK,this,this.onClose_wcjtn_Btn);
    }

    protected Banner_wcjtn_Up()
    {
        let self = this;
        WX_wcjtn_ADMgr.get_wcjtn_Banner((banner : WX_wcjtn_BannderAd)=>
        {
            if(null != self._banner_wcjtn_)
            {
                self._banner_wcjtn_._wcjtn_hide_wcjtn_();
            }
            self._banner_wcjtn_ = banner
            if (null != self._banner_wcjtn_) 
            {
                self._banner_wcjtn_._wcjtn_show_wcjtn_();
            }
            if(this.is_wcjtn_Show_wcjtn_HistoryBtn)
            {
                self.History_wcjtn_Btn.visible = true;
            }
        });
    }

    protected Btn_wcjtn_Up()
    {
        this._click_wcjtn_Tag = true;
        this._close_wcjtn_Btn.bottom = 270;
    }

    protected onClose_wcjtn_Btn()
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
        this.close_wcjtn_View();
    }

    onDestroy()
    {
        if(null != this._banner_wcjtn_)
        {
            this._banner_wcjtn_._wcjtn_hide_wcjtn_();
        }
        this._banner_wcjtn_ = null;
    }

    protected on_wcjtn_History_wcjtn_Btn()
    {
        let self = this;
        View_wcjtn_Mgr.ins_wcjtn_tance.open_wcjtn_View(View_wcjtn_Def.MiniGameView,null,(v : Mini_wcjtn_Game_wcjtn_View_wcjtn_Template)=>
        {
            self.hide_wcjtn_();
            if(null != self._banner_wcjtn_)
            {
                self._banner_wcjtn_._wcjtn_hide_wcjtn_();
            }
            v.on_wcjtn_CloseEvent = ()=>
            {
                if(null != self.View_wcjtn_ && !self.View_wcjtn_.destroyed)
                {
                    self.show_wcjtn_();
                    if(null != self._banner_wcjtn_)
                    {
                        self._banner_wcjtn_._wcjtn_show_wcjtn_();
                    }
                }
            }
        })
    }

}