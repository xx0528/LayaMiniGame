import WudianMgr from "../../../Mgr/WudianMgr";
import AppSwitchConfig from "../../../Config/AppSwitchConfig";
import Utilit from "../../../Utilit";
import QQTemplateViewBase_ppxhc from "../QQTemplateViewBase";
import QQMiniGameAPI from "../../../QQMiniGameAPI";
import AppConfig from "../../../AppConfig";

export default class QQGameWinViewTemplate_ppxhc extends QQTemplateViewBase_ppxhc
{
    protected _centerZone_ppxhc : Laya.Clip = null;
    protected _backBtn_ppxhc : Laya.Sprite = null;
    protected _nextBtn_ppxhc : Laya.Sprite = null;
    
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
        this._nextBtn_ppxhc = this._centerZone_ppxhc.getChildByName("NextBtn") as Laya.Sprite;
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
                this._nextBtn_ppxhc.y = yPos;
            }
            let excute = function()
            {
                var btnMoveTimer = AppSwitchConfig.getInstance().getAppSwitchData().btnMoveTimer;
                var bannerMoveTimer = AppSwitchConfig.getInstance().getAppSwitchData().bannerMoveTimer;
                Laya.timer.once(bannerMoveTimer * 1000, self, self.BannerUp);
                Laya.timer.once(btnMoveTimer * 1000, self, self.BtnUp);
            }
            if (AppSwitchConfig.getInstance().getAppSwitchData().qqcfg.box == 1)  
            {
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
        this._nextBtn_ppxhc.on(Laya.Event.CLICK,this,this.onNextBtn);
    }

    removeEvent()
    {
        super.removeEvent();
        this._backBtn_ppxhc.off(Laya.Event.CLICK,this,this.onBackBtn);
        this._nextBtn_ppxhc.off(Laya.Event.CLICK,this,this.onNextBtn);
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

    protected onNextBtn()
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
        this._nextBtn_ppxhc.y = 720;
    }

    onDestroy()
    {
        //todo：隐藏Banner
    }
}