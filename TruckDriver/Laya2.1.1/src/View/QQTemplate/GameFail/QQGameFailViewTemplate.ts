import WudianMgr from "../../../Mgr/WudianMgr";
import AppSwitchConfig from "../../../Config/AppSwitchConfig";
import WXADMgr, { WXBannder_ppxhc_Ad } from "../../../Mgr/WXADMgr";
import Utilit from "../../../Utilit";
import QQTemplateViewBase_ppxhc from "../QQTemplateViewBase";
import QQMiniGameAPI from "../../../QQMiniGameAPI";
import AppConfig from "../../../AppConfig";

export default class QQGameFailViewTemplate_ppxhc extends QQTemplateViewBase_ppxhc
{
    protected _centerZone_ppxhc : Laya.Clip = null;
    protected _backBtn_ppxhc : Laya.Sprite = null;
    protected _continueBtn_ppxhc : Laya.Sprite = null;
    
    protected _clickTag_ppxhc : boolean = false;
    protected _clickTimingTag_ppxhc : boolean = false;

    onAwake()
    {
        super.onAwake();
        this._centerZone_ppxhc = this.View.getChildByName("CenterZone") as Laya.Clip;
        if(Utilit.isIphoneX_())
        {
            this._centerZone_ppxhc.top =  this._centerZone_ppxhc.top + 75;
        }

        this._backBtn_ppxhc = this._centerZone_ppxhc.getChildByName("BackBtn") as Laya.Sprite;
        this._continueBtn_ppxhc = this._centerZone_ppxhc.getChildByName("ContinueBtn") as Laya.Sprite;
    }

    onStart()
    {
        super.onStart();
        let self = this;
        if(WudianMgr.Wudian_ppxhc_Flag && AppConfig.ppxhc_Versions == AppSwitchConfig.getInstance().getAppSwitchData().qqcfg.qqversions)
        {
            if(1 == AppSwitchConfig.getInstance().getAppSwitchData().qqcfg.weiyi)
            {
                let yPos = this._centerZone_ppxhc.height - 150;
                this._backBtn_ppxhc.y = yPos;
                this._continueBtn_ppxhc.y = yPos;
            }
            let excute = function()
            {
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
        this._backBtn_ppxhc.on(Laya.Event.CLICK,this,this.onBackBtn);
        this._continueBtn_ppxhc.on(Laya.Event.CLICK,this,this.onContinueBtn);
    }

    removeEvent()
    {
        super.removeEvent();
        this._backBtn_ppxhc.off(Laya.Event.CLICK,this,this.onBackBtn);
        this._continueBtn_ppxhc.off(Laya.Event.CLICK,this,this.onContinueBtn);
    }

    protected onBackBtn()
    {
        if(!this._clickTag_ppxhc && WudianMgr.Wudian_ppxhc_Flag)
        {
            var self = this
            if(!this._clickTimingTag_ppxhc)
            {
                this._clickTimingTag_ppxhc = true
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
        if(!this._clickTag_ppxhc && WudianMgr.Wudian_ppxhc_Flag)
        {
            var self = this
            if(!this._clickTimingTag_ppxhc)
            {
                this._clickTimingTag_ppxhc = true
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
        this._clickTag_ppxhc = true;
        this._backBtn_ppxhc.y = 720;
        this._continueBtn_ppxhc.y = 720;
    }

    onDestroy()
    {
        //todo：隐藏Banner
    }
}