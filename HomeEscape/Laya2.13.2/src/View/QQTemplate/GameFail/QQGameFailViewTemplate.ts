import ryw_WudianMgr from "../../../Mgr/WudianMgr";
import ryw_AppSwitchConfig from "../../../Config/AppSwitchConfig";
import ryw_WXADMgr, { ryw_WXBannderAd } from "../../../Mgr/WXADMgr";
import ryw_Utilit from "../../../Utilit";
import QQTemplateViewBase from "../QQTemplateViewBase";
import ryw_QQMiniGameAPI from "../../../QQMiniGameAPI";
import ryw_AppConfig from "../../../AppConfig";

export default class ryw_QQGameFailViewTemplate extends QQTemplateViewBase
{
    protected ryw__centerZone : Laya.Clip = null;
    protected ryw__backBtn : Laya.Sprite = null;
    protected ryw__continueBtn : Laya.Sprite = null;
    
    protected ryw__clickTag : boolean = false;
    protected ryw__clickTimingTag : boolean = false;

    onAwake()
    {
        super.onAwake();
        this.ryw__centerZone = this.ryw_View.getChildByName("CenterZone") as Laya.Clip;
        if(ryw_Utilit.ryw_isIphoneX())
        {
            this.ryw__centerZone.top =  this.ryw__centerZone.top + 75;
        }

        this.ryw__backBtn = this.ryw__centerZone.getChildByName("BackBtn") as Laya.Sprite;
        this.ryw__continueBtn = this.ryw__centerZone.getChildByName("ContinueBtn") as Laya.Sprite;
    }

    onStart()
    {
        super.onStart();
        let self = this;
        if(ryw_WudianMgr.ryw_WudianFlag && ryw_AppConfig.ryw_Versions == ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_qqcfg.ryw_qqversions)
        {
            if(1 == ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_qqcfg.ryw_weiyi)
            {
                let yPos = this.ryw__centerZone.height - 150;
                this.ryw__backBtn.y = yPos;
                this.ryw__continueBtn.y = yPos;
            }
            let excute = function()
            {
                self.ryw__clickTimingTag = true
                var btnMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_btnMoveTimer;
                var bannerMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerMoveTimer;
                Laya.timer.once(bannerMoveTimer * 1000, self, self.ryw_BannerUp);
                Laya.timer.once(btnMoveTimer * 1000, self, self.ryw_BtnUp);
            }
            if (1 == ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_qqcfg.ryw_box)  {
                ryw_QQMiniGameAPI.ryw_showAppBoxAd(() =>  
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

    ryw_addEvent()
    {
        super.ryw_addEvent();
        this.ryw__backBtn.on(Laya.Event.CLICK,this,this.ryw_onBackBtn);
        this.ryw__continueBtn.on(Laya.Event.CLICK,this,this.ryw_onContinueBtn);
    }

    ryw_removeEvent()
    {
        super.ryw_removeEvent();
        this.ryw__backBtn.off(Laya.Event.CLICK,this,this.ryw_onBackBtn);
        this.ryw__continueBtn.off(Laya.Event.CLICK,this,this.ryw_onContinueBtn);
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

    protected ryw_onContinueBtn()
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

    protected ryw_BannerUp()
    {
        //todo：显示Banner
    }

    protected ryw_BtnUp()
    {
        this.ryw__clickTag = true;
        this.ryw__backBtn.y = 720;
        this.ryw__continueBtn.y = 720;
    }

    onDestroy()
    {
        //todo：隐藏Banner
    }
}