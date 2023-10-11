import WudianMgr from "../../../Mgr/WudianMgr";
import AppSwitchConfig from "../../../Config/AppSwitchConfig";
import WXADMgr, { WXBannderAd } from "../../../Mgr/WXADMgr";
import Utilit from "../../../Utilit";
import QQTemplateViewBase from "../QQTemplateViewBase";
import QQMiniGameAPI from "../../../QQMiniGameAPI";
import AppConfig from "../../../AppConfig";

export default class QQGameFailViewTemplate extends QQTemplateViewBase
{
    protected _centerZone : Laya.Clip = null;
    protected _backBtn : Laya.Sprite = null;
    protected _continueBtn : Laya.Sprite = null;
    
    protected _clickTag : boolean = false;
    protected _clickTimingTag : boolean = false;

    onAwake()
    {
        super.onAwake();
        this._centerZone = this.View.getChildByName("CenterZone") as Laya.Clip;
        if(Utilit.isIphoneX())
        {
            this._centerZone.top =  this._centerZone.top + 75;
        }

        this._backBtn = this._centerZone.getChildByName("BackBtn") as Laya.Sprite;
        this._continueBtn = this._centerZone.getChildByName("ContinueBtn") as Laya.Sprite;
    }

    onStart()
    {
        super.onStart();
        let self = this;
        if(WudianMgr.WudianFlag && AppConfig.Versions == AppSwitchConfig.getInstance().getAppSwitchData().qqcfg.qqversions)
        {
            if(1 == AppSwitchConfig.getInstance().getAppSwitchData().qqcfg.weiyi)
            {
                let yPos = this._centerZone.height - 150;
                this._backBtn.y = yPos;
                this._continueBtn.y = yPos;
            }
            let excute = function()
            {
                self._clickTimingTag = true
                var btnMoveTimer = AppSwitchConfig.getInstance().getAppSwitchData().btnMoveTimer;
                var bannerMoveTimer = AppSwitchConfig.getInstance().getAppSwitchData().bannerMoveTimer;
                Laya.timer.once(bannerMoveTimer * 1000, self, self.BannerUp);
                Laya.timer.once(btnMoveTimer * 1000, self, self.BtnUp);
            }
            if (1 == AppSwitchConfig.getInstance().getAppSwitchData().qqcfg.box)  {
                QQMiniGameAPI.showAppBoxAd(() =>  
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

    addEvent()
    {
        super.addEvent();
        this._backBtn.on(Laya.Event.CLICK,this,this.onBackBtn);
        this._continueBtn.on(Laya.Event.CLICK,this,this.onContinueBtn);
    }

    removeEvent()
    {
        super.removeEvent();
        this._backBtn.off(Laya.Event.CLICK,this,this.onBackBtn);
        this._continueBtn.off(Laya.Event.CLICK,this,this.onContinueBtn);
    }

    protected onBackBtn()
    {
        if(!this._clickTag && WudianMgr.WudianFlag)
        {
            var self = this
            if(!this._clickTimingTag)
            {
                this._clickTimingTag = true
                var btnMoveTimer = AppSwitchConfig.getInstance().getAppSwitchData().btnMoveTimer;
                var bannerMoveTimer = AppSwitchConfig.getInstance().getAppSwitchData().bannerMoveTimer;
                Laya.timer.once(bannerMoveTimer * 1000,this,this.BannerUp);
                Laya.timer.once(btnMoveTimer * 1000,this,this.BtnUp);
            }
            return;
        }

        //todo:你的代码
    }

    protected onContinueBtn()
    {
        if(!this._clickTag && WudianMgr.WudianFlag)
        {
            var self = this
            if(!this._clickTimingTag)
            {
                this._clickTimingTag = true
                var btnMoveTimer = AppSwitchConfig.getInstance().getAppSwitchData().btnMoveTimer;
                var bannerMoveTimer = AppSwitchConfig.getInstance().getAppSwitchData().bannerMoveTimer;
                Laya.timer.once(bannerMoveTimer * 1000,this,this.BannerUp);
                Laya.timer.once(btnMoveTimer * 1000,this,this.BtnUp);
            }
            return;
        }

        //todo:你的代码
    }

    protected BannerUp()
    {
        //todo：显示Banner
    }

    protected BtnUp()
    {
        this._clickTag = true;
        this._backBtn.y = 720;
        this._continueBtn.y = 720;
    }

    onDestroy()
    {
        //todo：隐藏Banner
    }
}