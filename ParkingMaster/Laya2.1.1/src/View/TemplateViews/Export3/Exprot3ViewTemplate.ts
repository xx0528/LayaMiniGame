import TemplateViewBase from "../TemplateViewBase";
import KRQ_VLoopAd from "../../../KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd";
import AppSwitchConfig from "../../../Config/AppSwitchConfig";
import Utilit from "../../../Utilit";
import WXADMgr, { WXBannderAd } from "../../../Mgr/WXADMgr";
import ViewMgr, { ViewDef } from "../../../Mgr/ViewMgr";
import MiniGameViewTemplate from "../MiniGame/MiniGameViewTemplate";
import WudianMgr from "../../../Mgr/WudianMgr";
import ShareAd from "../../../ShareAd/ShareAd";

export default class Exprot3ViewTemplate extends TemplateViewBase
{
    protected _closeBtn : Laya.Clip = null;
    protected _krqVLoopAd : KRQ_VLoopAd = null;
    protected _KRQ_VLoopAd : Laya.Clip = null;

    protected _clickTag : boolean = false;
    protected _clickTimingTag : boolean = false;

    protected _banner : WXBannderAd = null;

    onAwake()
    {
        super.onAwake();
        this._krqVLoopAd = this.View.getChildByName("KRQ_VLoopAd").getComponent(KRQ_VLoopAd);
        this._closeBtn = this.View.getChildByName("CloseBtn") as Laya.Clip;

        this._KRQ_VLoopAd = this.View.getChildByName("KRQ_VLoopAd") as Laya.Clip;
        if(Utilit.isIphoneX())
        {
            this._KRQ_VLoopAd.top =  this._KRQ_VLoopAd.top + 75;
        }

        let aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5) 
        {
            this._KRQ_VLoopAd.height = 900;
        }
        else
        {
            this._KRQ_VLoopAd.height = 750;
        }
    }
    
    onStart()
    {
        this._krqVLoopAd.AdPosID = ShareAd.MoreGameLocationID;
        super.onStart();
        if(WudianMgr.WudianFlag)
        {
            var btnMoveTimer = AppSwitchConfig.getInstance().getAppSwitchData().btnMoveTimer;
            var bannerMoveTimer = AppSwitchConfig.getInstance().getAppSwitchData().bannerMoveTimer;
            Laya.timer.once(bannerMoveTimer * 1000,this,this.BannerUp);
            Laya.timer.once(btnMoveTimer * 1000,this,this.BtnUp);
        }
    }

    addEvent()
    {
        super.addEvent();
        this._closeBtn.on(Laya.Event.CLICK,this,this.onCloseBtn);
    }

    removeEvent()
    {
        super.removeEvent();
        this._closeBtn.off(Laya.Event.CLICK,this,this.onCloseBtn);
    }

    protected BannerUp()
    {
        let self = this;
        WXADMgr.getBanner((banner : WXBannderAd)=>
        {
            if(null != self._banner)
            {
                self._banner.hide();
            }
            self._banner = banner
            if (null != self._banner) 
            {
                self._banner.show();
            }
            if(this.isShowHistoryBtn)
            {
                self.HistoryBtn.visible = true;
            }
        });
    }

    protected BtnUp()
    {
        this._clickTag = true;
        let aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5) 
        {
            this._closeBtn.bottom = 270;
        }
        else
        {
            this._closeBtn.bottom = 370;
        }
    }

    protected onCloseBtn()
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
        this.closeView();
    }

    onDestroy()
    {
        if(null != this._banner)
        {
            this._banner.hide();
        }
        this._banner = null;
    }

    protected onHistoryBtn()
    {
        let self = this;
        ViewMgr.instance.openView(ViewDef.MiniGameView,null,(v : MiniGameViewTemplate)=>
        {
            self.hide();
            if(null != self._banner)
            {
                self._banner.hide();
            }
            v.onCloseEvent = ()=>
            {
                if(null != self.View && !self.View.destroyed)
                {
                    self.show();
                    if(null != self._banner)
                    {
                        self._banner.show();
                    }
                }
            }
        })
    }

}