import ryw_TemplateViewBase from "../TemplateViewBase";
import ryw_KRQ_VLoopAd from "../../../KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd";
import ryw_AppSwitchConfig from "../../../Config/AppSwitchConfig";
import ryw_Utilit from "../../../Utilit";
import ryw_WXADMgr, { ryw_WXBannderAd } from "../../../Mgr/WXADMgr";
import ryw_ViewMgr, { ryw_ViewDef } from "../../../Mgr/ViewMgr";
import ryw_MiniGameViewTemplate from "../MiniGame/MiniGameViewTemplate";
import ryw_WudianMgr from "../../../Mgr/WudianMgr";
import ryw_ShareAd from "../../../ShareAd/ShareAd";

export default class ryw_Exprot3ViewTemplate extends ryw_TemplateViewBase
{
    protected _closeBtn : Laya.Clip = null;
    protected _krqVLoopAd : ryw_KRQ_VLoopAd = null;
    protected _KRQ_VLoopAd : Laya.Clip = null;

    protected _clickTag : boolean = false;
    protected _clickTimingTag : boolean = false;

    protected _banner : ryw_WXBannderAd = null;

    onAwake()
    {
        super.onAwake();
        this._krqVLoopAd = this.ryw_View.getChildByName("KRQ_VLoopAd").getComponent(ryw_KRQ_VLoopAd);
        this._closeBtn = this.ryw_View.getChildByName("CloseBtn") as Laya.Clip;

        this._KRQ_VLoopAd = this.ryw_View.getChildByName("KRQ_VLoopAd") as Laya.Clip;
        if(ryw_Utilit.ryw_isIphoneX())
        {
            this._KRQ_VLoopAd.top =  this._KRQ_VLoopAd.top + 75;
        }
    }
    
    onStart()
    {
        this._krqVLoopAd.ryw_AdPosID = ryw_ShareAd.ryw_MoreGameLocationID;
        super.onStart();
        if(ryw_WudianMgr.ryw_WudianFlag)
        {
            var btnMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_btnMoveTimer;
            var bannerMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerMoveTimer;
            Laya.timer.once(bannerMoveTimer * 1000,this,this.BannerUp);
            Laya.timer.once(btnMoveTimer * 1000,this,this.BtnUp);
        }
    }

    ryw_addEvent()
    {
        super.ryw_addEvent();
        this._closeBtn.on(Laya.Event.CLICK,this,this.onCloseBtn);
    }

    ryw_removeEvent()
    {
        super.ryw_removeEvent();
        this._closeBtn.off(Laya.Event.CLICK,this,this.onCloseBtn);
    }

    protected BannerUp()
    {
        let self = this;
        ryw_WXADMgr.ryw_getBanner((banner : ryw_WXBannderAd)=>
        {
            if(null != self._banner)
            {
                self._banner.ryw_hide();
            }
            self._banner = banner
            if (null != self._banner) 
            {
                self._banner.ryw_show();
            }
            if(this.isShowHistoryBtn)
            {
                self.ryw_HistoryBtn.visible = true;
            }
        });
    }

    protected BtnUp()
    {
        this._clickTag = true;
        this._closeBtn.bottom = 270;
    }

    protected onCloseBtn()
    {
        if(!this._clickTag && ryw_WudianMgr.ryw_WudianFlag)
        {
            var self = this
            if(!this._clickTimingTag)
            {
                this._clickTimingTag = true
                var btnMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_btnMoveTimer;
                var bannerMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerMoveTimer;
                Laya.timer.once(bannerMoveTimer * 1000,this,this.BannerUp);
                Laya.timer.once(btnMoveTimer * 1000,this,this.BtnUp);
            }
            return;
        }
        this.ryw_closeView();
    }

    onDestroy()
    {
        if(null != this._banner)
        {
            this._banner.ryw_hide();
        }
        this._banner = null;
    }

    protected onHistoryBtn()
    {
        let self = this;
        ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.ryw_MiniGameView,null,(v : ryw_MiniGameViewTemplate)=>
        {
            self.ryw_hide();
            if(null != self._banner)
            {
                self._banner.ryw_hide();
            }
            v.ryw_onCloseEvent = ()=>
            {
                if(null != self.ryw_View && !self.ryw_View.destroyed)
                {
                    self.ryw_show();
                    if(null != self._banner)
                    {
                        self._banner.ryw_show();
                    }
                }
            }
        })
    }

}