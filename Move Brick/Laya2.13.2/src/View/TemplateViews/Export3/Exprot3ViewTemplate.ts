import TemplateViewBase from "../TemplateViewBase";
import KRQ_VLoopAd from "../../../KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd";
import App_ZMDGJ_Switch_ZMDGJ_Config from "../../../Config/AppSwitchConfig";
import Utilit_ZMDGJ_ from "../../../Utilit";
import WX_ZMDGJ_ADMgr, { WX_ZMDGJ_BannderAd } from "../../../Mgr/WXADMgr";
import View_ZMDGJ_Mgr, { View_ZMDGJ_Def } from "../../../Mgr/ViewMgr";
import Mini_ZMDGJ_Game_ZMDGJ_View_ZMDGJ_Template from "../MiniGame/MiniGameViewTemplate";
import Wu_ZMDGJ_dian_ZMDGJ_Mgr from "../../../Mgr/WudianMgr";
import _ZMDGJ_ShareAd_ZMDGJ_ from "../../../ShareAd/ShareAd";

export default class Exprot3ViewTemplate extends TemplateViewBase
{
    protected _close_ZMDGJ_Btn : Laya.Clip = null;
    protected _krq_ZMDGJ_VLoopAd : KRQ_VLoopAd = null;
    protected _KRQ__ZMDGJ_VLoopAd : Laya.Clip = null;

    protected _click_ZMDGJ_Tag : boolean = false;
    protected _click_ZMDGJ_TimingTag : boolean = false;

    protected _banner_ZMDGJ_ : WX_ZMDGJ_BannderAd = null;

    onAwake()
    {
        super.onAwake();
        this._krq_ZMDGJ_VLoopAd = this.View_ZMDGJ_.getChildByName("KRQ_VLoopAd").getComponent(KRQ_VLoopAd);
        this._close_ZMDGJ_Btn = this.View_ZMDGJ_.getChildByName("CloseBtn") as Laya.Clip;

        this._KRQ__ZMDGJ_VLoopAd = this.View_ZMDGJ_.getChildByName("KRQ_VLoopAd") as Laya.Clip;
        if(Utilit_ZMDGJ_.is_ZMDGJ_IphoneX())
        {
            this._KRQ__ZMDGJ_VLoopAd.top =  this._KRQ__ZMDGJ_VLoopAd.top + 75;
        }

        let aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5) 
        {
            this._KRQ__ZMDGJ_VLoopAd.height = 900;
        }
        else
        {
            this._KRQ__ZMDGJ_VLoopAd.height = 750;
        }
    }
    
    onStart()
    {
        this._krq_ZMDGJ_VLoopAd.Ad_ZMDGJ_Pos_ZMDGJ_ID = _ZMDGJ_ShareAd_ZMDGJ_.MoreGame_ZMDGJ_LocationID;
        super.onStart();
        if(Wu_ZMDGJ_dian_ZMDGJ_Mgr.Wu_ZMDGJ_dian_ZMDGJ_Flag)
        {
            var btnMoveTimer = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().btn_ZMDGJ_Move_ZMDGJ_Timer;
            var bannerMoveTimer = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().banner_ZMDGJ_Move_ZMDGJ_Timer;
            Laya.timer.once(bannerMoveTimer * 1000,this,this.Banner_ZMDGJ_Up);
            Laya.timer.once(btnMoveTimer * 1000,this,this.Btn_ZMDGJ_Up);
        }
    }

    add_ZMDGJ_Event()
    {
        super.add_ZMDGJ_Event();
        this._close_ZMDGJ_Btn.on(Laya.Event.CLICK,this,this.onClose_ZMDGJ_Btn);
    }

    remove_ZMDGJ_Event()
    {
        super.remove_ZMDGJ_Event();
        this._close_ZMDGJ_Btn.off(Laya.Event.CLICK,this,this.onClose_ZMDGJ_Btn);
    }

    protected Banner_ZMDGJ_Up()
    {
        let self = this;
        WX_ZMDGJ_ADMgr.get_ZMDGJ_Banner((banner : WX_ZMDGJ_BannderAd)=>
        {
            // if(null != self._banner_ZMDGJ_)
            // {
            //     self._banner_ZMDGJ_._ZMDGJ_hide_ZMDGJ_();
            // }
            // self._banner_ZMDGJ_ = banner
            // if (null != self._banner_ZMDGJ_) 
            // {
            //     self._banner_ZMDGJ_._ZMDGJ_show_ZMDGJ_();
            // }
            // if(this.is_ZMDGJ_Show_ZMDGJ_HistoryBtn)
            // {
            //     self.History_ZMDGJ_Btn.visible = true;
            // }
        });
    }

    protected Btn_ZMDGJ_Up()
    {
        this._click_ZMDGJ_Tag = true;
        let aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5) 
        {
            this._close_ZMDGJ_Btn.bottom = 270;
        }
        else
        {
            this._close_ZMDGJ_Btn.bottom = 370;
        }
    }

    protected onClose_ZMDGJ_Btn()
    {
        if(!this._click_ZMDGJ_Tag && Wu_ZMDGJ_dian_ZMDGJ_Mgr.Wu_ZMDGJ_dian_ZMDGJ_Flag)
        {
            var self = this
            if(!this._click_ZMDGJ_TimingTag)
            {
                this._click_ZMDGJ_TimingTag = true
                var btnMoveTimer = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().btn_ZMDGJ_Move_ZMDGJ_Timer;
                var bannerMoveTimer = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().banner_ZMDGJ_Move_ZMDGJ_Timer;
                Laya.timer.once(bannerMoveTimer * 1000,this,this.Banner_ZMDGJ_Up);
                Laya.timer.once(btnMoveTimer * 1000,this,this.Btn_ZMDGJ_Up);
            }
            return;
        }
        this.close_ZMDGJ_View();
    }

    onDestroy()
    {
        if(null != this._banner_ZMDGJ_)
        {
            this._banner_ZMDGJ_._ZMDGJ_hide_ZMDGJ_();
        }
        this._banner_ZMDGJ_ = null;
    }

    protected on_ZMDGJ_History_ZMDGJ_Btn()
    {
        let self = this;
        View_ZMDGJ_Mgr.ins_ZMDGJ_tance.open_ZMDGJ_View(View_ZMDGJ_Def.MiniGameView,null,(v : Mini_ZMDGJ_Game_ZMDGJ_View_ZMDGJ_Template)=>
        {
            self.hide_ZMDGJ_();
            if(null != self._banner_ZMDGJ_)
            {
                self._banner_ZMDGJ_._ZMDGJ_hide_ZMDGJ_();
            }
            v.on_ZMDGJ_CloseEvent = ()=>
            {
                if(null != self.View_ZMDGJ_ && !self.View_ZMDGJ_.destroyed)
                {
                    self.show_ZMDGJ_();
                    if(null != self._banner_ZMDGJ_)
                    {
                        self._banner_ZMDGJ_._ZMDGJ_show_ZMDGJ_();
                    }
                }
            }
        })
    }

}