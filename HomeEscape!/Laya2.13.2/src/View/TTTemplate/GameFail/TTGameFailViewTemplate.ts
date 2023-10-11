import ryw_WudianMgr from "../../../Mgr/WudianMgr";
import ryw_AppSwitchConfig from "../../../Config/AppSwitchConfig";
import ryw_WXADMgr, { ryw_WXBannderAd } from "../../../Mgr/WXADMgr";
import ryw_Utilit from "../../../Utilit";
import ryw_TTTemplateViewBase from "../TTTemplateViewBase";
import ryw_TTAPI from "../../../TTAPI";

export default class ryw_TTGameFailViewTemplate extends ryw_TTTemplateViewBase
{
    protected ryw__centerZone : Laya.Clip = null;
    
    protected ryw__clickTag : boolean = false;
    protected ryw__clickTimingTag : boolean = false;

    protected ryw__moreGameBtn : Laya.Sprite = null;
    protected ryw__shareBtn : Laya.Sprite = null;

    protected ryw__backBtn : Laya.Sprite = null;
    protected ryw__okBtn : Laya.Sprite = null;
    protected ryw__videoBtn : Laya.Sprite = null;
    

    onAwake()
    {
        super.onAwake();
        this.ryw__centerZone = this.ryw_View.getChildByName("CenterZone") as Laya.Clip;
        if(ryw_Utilit.ryw_isIphoneX())
        {
            this.ryw__centerZone.top =  this.ryw__centerZone.top + 75;
        }

        this.ryw__moreGameBtn = this.ryw__centerZone.getChildByName("MoreGameBtn") as Laya.Clip;
        this.ryw__shareBtn = this.ryw__centerZone.getChildByName("ShareBtn") as Laya.Clip;

        this.ryw__backBtn = this.ryw__centerZone.getChildByName("BackBtn") as Laya.Sprite;
        this.ryw__okBtn = this.ryw__centerZone.getChildByName("OkBtn") as Laya.Sprite;
        this.ryw__videoBtn = this.ryw__centerZone.getChildByName("VideoBtn") as Laya.Sprite;

        this.ryw__moreGameBtn.visible = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_ttcfg.ryw_moreGameSwitch == 1;
    }

    onStart()
    {
        super.onStart();
        if(ryw_WudianMgr.ryw_WudianFlag)
        {
            let yPos = this.ryw__centerZone.height - 150;
            this.ryw__backBtn.y = yPos;
            this.ryw__okBtn.y = yPos;
            this.ryw__videoBtn.y = yPos;
        }
        
        var btnMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_btnMoveTimer;
        var bannerMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerMoveTimer;
        Laya.timer.once(bannerMoveTimer * 1000,this,this.ryw_BannerUp);
        Laya.timer.once(btnMoveTimer * 1000,this,this.ryw_BtnUp);

        if(ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_ttcfg.ryw_luping == 1)
        {
            ryw_TTAPI.ryw_shareRecord(()=>
            {
                
            },()=>
            {
                
            })
        }
    }

    ryw_addEvent()
    {
        super.ryw_addEvent();
        this.ryw__backBtn.on(Laya.Event.CLICK,this,this.ryw_onBackBtn);
        this.ryw__okBtn.on(Laya.Event.CLICK,this,this.ryw_onOkBtn);
        this.ryw__videoBtn.on(Laya.Event.CLICK,this,this.ryw_onOkBtn);
        
        this.ryw__moreGameBtn.on(Laya.Event.CLICK,this,this.ryw_onMoreGameBtn);
        this.ryw__shareBtn.on(Laya.Event.CLICK,this,this.ryw_onShareBtn);
    }

    ryw_removeEvent()
    {
        super.ryw_removeEvent();
        this.ryw__backBtn.off(Laya.Event.CLICK,this,this.ryw_onBackBtn);
        this.ryw__okBtn.off(Laya.Event.CLICK,this,this.ryw_onOkBtn);
        this.ryw__videoBtn.off(Laya.Event.CLICK,this,this.ryw_onOkBtn);
        
        this.ryw__moreGameBtn.off(Laya.Event.CLICK,this,this.ryw_onMoreGameBtn);
        this.ryw__shareBtn.off(Laya.Event.CLICK,this,this.ryw_onShareBtn);
    }

    protected ryw_onBackBtn()
    {
        if(!this.ryw__clickTag && ryw_WudianMgr.ryw_WudianFlag)
        {
            var self = this
            if(!this.ryw__clickTimingTag)
            {
                this.ryw__clickTimingTag = true
                var btnMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_btnMoveTimer;
                var bannerMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerMoveTimer;
                Laya.timer.once(bannerMoveTimer * 1000,this,this.ryw_BannerUp);
                Laya.timer.once(btnMoveTimer * 1000,this,this.ryw_BtnUp);
            }
            return;
        }

        //todo:你的代码
    }

    protected ryw_onOkBtn()
    {
        if(!this.ryw__clickTag && ryw_WudianMgr.ryw_WudianFlag)
        {
            var self = this
            if(!this.ryw__clickTimingTag)
            {
                this.ryw__clickTimingTag = true
                var btnMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_btnMoveTimer;
                var bannerMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerMoveTimer;
                Laya.timer.once(bannerMoveTimer * 1000,this,this.ryw_BannerUp);
                Laya.timer.once(btnMoveTimer * 1000,this,this.ryw_BtnUp);
            }
            return;
        }

        //todo:你的代码
    }


    protected ryw_onVideoBtn()
    {
        if(!this.ryw__clickTag && ryw_WudianMgr.ryw_WudianFlag)
        {
            var self = this
            if(!this.ryw__clickTimingTag)
            {
                this.ryw__clickTimingTag = true
                var btnMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_btnMoveTimer;
                var bannerMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerMoveTimer;
                Laya.timer.once(bannerMoveTimer * 1000,this,this.ryw_BannerUp);
                Laya.timer.once(btnMoveTimer * 1000,this,this.ryw_BtnUp);
            }
            return;
        }

        ryw_TTAPI.ryw_shareRecord(() =>  
        {

        }, () =>  
        {
            
        })
    }

    protected ryw_BannerUp()
    {
        ryw_TTAPI.ryw_showBanner();
    }

    protected ryw_BtnUp()
    {
        this.ryw__clickTag = true;
        this.ryw__backBtn.y = 720;
        this.ryw__okBtn.y = 720;
        this.ryw__videoBtn.y = 720;
    }

    protected ryw_onMoreGameBtn()
    {
        ryw_TTAPI.ryw_showMoreGamesModal(()=>
        {
            
        },()=>
        {

        })
    }

    protected ryw_onShareBtn()
    {
        ryw_TTAPI.ryw_share(()=>
        {

        })
    }

    onDestroy()
    {
        ryw_TTAPI.ryw_hideBanner();
    }
}