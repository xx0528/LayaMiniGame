import WudianMgr from "../../../Mgr/WudianMgr";
import AppSwitchConfig from "../../../Config/AppSwitchConfig";
import Utilit from "../../../Utilit";
import QQTemplateViewBase from "../QQTemplateViewBase";
import QQMiniGameAPI from "../../../QQMiniGameAPI";
import AppConfig from "../../../AppConfig";

export default class QQGameWinViewTemplate extends QQTemplateViewBase
{
    protected _centerZone : Laya.Clip = null;
    protected _backBtn : Laya.Sprite = null;
    protected _nextBtn : Laya.Sprite = null;
    
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
        this._nextBtn = this._centerZone.getChildByName("NextBtn") as Laya.Sprite;
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
                this._nextBtn.y = yPos;
            }
            let excute = function()
            {
                self._clickTimingTag = true
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
        this._backBtn.on(Laya.Event.CLICK,this,this.onBackBtn);
        this._nextBtn.on(Laya.Event.CLICK,this,this.onNextBtn);
    }

    removeEvent()
    {
        super.removeEvent();
        this._backBtn.off(Laya.Event.CLICK,this,this.onBackBtn);
        this._nextBtn.off(Laya.Event.CLICK,this,this.onNextBtn);
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

    protected onNextBtn()
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
        this._nextBtn.y = 720;
    }

    onDestroy()
    {
        //todo：隐藏Banner
    }
}