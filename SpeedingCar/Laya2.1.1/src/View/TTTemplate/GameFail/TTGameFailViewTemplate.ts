import Wu_wcjtn_dian_wcjtn_Mgr from "../../../Mgr/WudianMgr";
import App_wcjtn_Switch_wcjtn_Config from "../../../Config/AppSwitchConfig";
import WXADMgr, { WX_wcjtn_BannderAd } from "../../../Mgr/WXADMgr";
import Utilit_wcjtn_ from "../../../Utilit";
import TT_wcjtn_Template_wcjtn_View_wcjtn_Base from "../TTTemplateViewBase";
import TT_wcjtn_API from "../../../TTAPI";

export default class TTGameFailViewTemplate extends TT_wcjtn_Template_wcjtn_View_wcjtn_Base
{
    protected _center_wcjtn_Zone : Laya.Clip = null;
    
    protected _clickTag : boolean = false;
    protected _clickTimingTag : boolean = false;

    protected _moreGameBtn : Laya.Sprite = null;
    protected _shareBtn : Laya.Sprite = null;

    protected _backBtn : Laya.Sprite = null;
    protected _okBtn : Laya.Sprite = null;
    protected _videoBtn : Laya.Sprite = null;
    

    onAwake()
    {
        super.onAwake();
        this._center_wcjtn_Zone = this.View_wcjtn_.getChildByName("CenterZone") as Laya.Clip;
        if(Utilit_wcjtn_.is_wcjtn_IphoneX())
        {
            this._center_wcjtn_Zone.top =  this._center_wcjtn_Zone.top + 75;
        }

        this._moreGameBtn = this._center_wcjtn_Zone.getChildByName("MoreGameBtn") as Laya.Clip;
        this._shareBtn = this._center_wcjtn_Zone.getChildByName("ShareBtn") as Laya.Clip;

        this._backBtn = this._center_wcjtn_Zone.getChildByName("BackBtn") as Laya.Sprite;
        this._okBtn = this._center_wcjtn_Zone.getChildByName("OkBtn") as Laya.Sprite;
        this._videoBtn = this._center_wcjtn_Zone.getChildByName("VideoBtn") as Laya.Sprite;

        this._moreGameBtn.visible = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().tt_wcjtn_cfg.more_wcjtn_Game_wcjtn_Switch == 1;
    }

    onStart()
    {
        super.onStart();
        if(Wu_wcjtn_dian_wcjtn_Mgr.Wu_wcjtn_dian_wcjtn_Flag)
        {
            let yPos = this._center_wcjtn_Zone.height - 150;
            this._backBtn.y = yPos;
            this._okBtn.y = yPos;
            this._videoBtn.y = yPos;
        }
        
        var btnMoveTimer = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().btn_wcjtn_Move_wcjtn_Timer;
        var bannerMoveTimer = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Move_wcjtn_Timer;
        Laya.timer.once(bannerMoveTimer * 1000,this,this.Banner_wcjtn_Up);
        Laya.timer.once(btnMoveTimer * 1000,this,this.Btn_wcjtn_Up);

        if(App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().tt_wcjtn_cfg.lu_wcjtn_ping == 1)
        {
            TT_wcjtn_API.share_wcjtn_Record(()=>
            {
                
            },()=>
            {
                
            })
        }
    }

    add_wcjtn_Event()
    {
        super.add_wcjtn_Event();
        this._backBtn.on(Laya.Event.CLICK,this,this.on_wcjtn_Back_wcjtn_Btn);
        this._okBtn.on(Laya.Event.CLICK,this,this.on_wcjtn_Ok_wcjtn_Btn);
        this._videoBtn.on(Laya.Event.CLICK,this,this.on_wcjtn_Ok_wcjtn_Btn);
        
        this._moreGameBtn.on(Laya.Event.CLICK,this,this.on_wcjtn_More_wcjtn_GameBtn);
        this._shareBtn.on(Laya.Event.CLICK,this,this.on_wcjtn_Share_wcjtn_Btn);
    }

    remove_wcjtn_Event()
    {
        super.remove_wcjtn_Event();
        this._backBtn.off(Laya.Event.CLICK,this,this.on_wcjtn_Back_wcjtn_Btn);
        this._okBtn.off(Laya.Event.CLICK,this,this.on_wcjtn_Ok_wcjtn_Btn);
        this._videoBtn.off(Laya.Event.CLICK,this,this.on_wcjtn_Ok_wcjtn_Btn);
        
        this._moreGameBtn.off(Laya.Event.CLICK,this,this.on_wcjtn_More_wcjtn_GameBtn);
        this._shareBtn.off(Laya.Event.CLICK,this,this.on_wcjtn_Share_wcjtn_Btn);
    }

    protected on_wcjtn_Back_wcjtn_Btn()
    {
        if(!this._clickTag && Wu_wcjtn_dian_wcjtn_Mgr.Wu_wcjtn_dian_wcjtn_Flag)
        {
            var self = this
            if(!this._clickTimingTag)
            {
                this._clickTimingTag = true
                var btnMoveTimer = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().btn_wcjtn_Move_wcjtn_Timer;
                var bannerMoveTimer = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Move_wcjtn_Timer;
                Laya.timer.once(bannerMoveTimer * 1000,this,this.Banner_wcjtn_Up);
                Laya.timer.once(btnMoveTimer * 1000,this,this.Btn_wcjtn_Up);
            }
            return;
        }

        //todo:你的代码
    }

    protected on_wcjtn_Ok_wcjtn_Btn()
    {
        if(!this._clickTag && Wu_wcjtn_dian_wcjtn_Mgr.Wu_wcjtn_dian_wcjtn_Flag)
        {
            var self = this
            if(!this._clickTimingTag)
            {
                this._clickTimingTag = true
                var btnMoveTimer = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().btn_wcjtn_Move_wcjtn_Timer;
                var bannerMoveTimer = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Move_wcjtn_Timer;
                Laya.timer.once(bannerMoveTimer * 1000,this,this.Banner_wcjtn_Up);
                Laya.timer.once(btnMoveTimer * 1000,this,this.Btn_wcjtn_Up);
            }
            return;
        }

        //todo:你的代码
    }


    protected on_wcjtn_Video_wcjtn_Btn()
    {
        if(!this._clickTag && Wu_wcjtn_dian_wcjtn_Mgr.Wu_wcjtn_dian_wcjtn_Flag)
        {
            var self = this
            if(!this._clickTimingTag)
            {
                this._clickTimingTag = true
                var btnMoveTimer = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().btn_wcjtn_Move_wcjtn_Timer;
                var bannerMoveTimer = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Move_wcjtn_Timer;
                Laya.timer.once(bannerMoveTimer * 1000,this,this.Banner_wcjtn_Up);
                Laya.timer.once(btnMoveTimer * 1000,this,this.Btn_wcjtn_Up);
            }
            return;
        }

        TT_wcjtn_API.share_wcjtn_Record(()=>
        {
            
        },()=>
        {
            
        })
    }

    protected Banner_wcjtn_Up()
    {
        TT_wcjtn_API.show_wcjtn_Banner();
    }

    protected Btn_wcjtn_Up()
    {
        this._clickTag = true;
        this._backBtn.y = 720;
        this._okBtn.y = 720;
        this._videoBtn.y = 720;
    }

    protected on_wcjtn_More_wcjtn_GameBtn()
    {
        TT_wcjtn_API.showMoreGamesModal(()=>
        {
            
        },()=>
        {

        })
    }

    protected on_wcjtn_Share_wcjtn_Btn()
    {
        TT_wcjtn_API.share_wcjtn_(()=>
        {

        })
    }

    onDestroy()
    {
        TT_wcjtn_API.hideBanner();
    }
}