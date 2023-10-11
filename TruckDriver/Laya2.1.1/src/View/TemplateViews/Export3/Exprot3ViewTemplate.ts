import TemplateViewBase from "../TemplateViewBase";
import KRQ_VLoopAd from "../../../KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd";
import AppSwitchConfig from "../../../Config/AppSwitchConfig";
import Utilit from "../../../Utilit";
import WXADMgr, { WXBannder_ppxhc_Ad } from "../../../Mgr/WXADMgr";
import ViewMgr, { View_ppxhc_Def } from "../../../Mgr/ViewMgr";
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

    protected _banner : WXBannder_ppxhc_Ad = null;

    onAwake()
    {
        super.onAwake();
        this._krqVLoopAd = this.View.getChildByName("KRQ_VLoopAd").getComponent(KRQ_VLoopAd);
        this._closeBtn = this.View.getChildByName("CloseBtn") as Laya.Clip;

        this._KRQ_VLoopAd = this.View.getChildByName("KRQ_VLoopAd") as Laya.Clip;
        if(Utilit.isIphoneX_())
        {
            this._KRQ_VLoopAd.top =  this._KRQ_VLoopAd.top + 75;
        }
    }
    
    onStart()
    {
        this._krqVLoopAd.AdPos_ppxhc_ID = ShareAd.MoreGameLocationID;
        super.onStart();
        if(WudianMgr.Wudian_ppxhc_Flag)
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
        WXADMgr.getBanner((banner : WXBannder_ppxhc_Ad)=>
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
                self.History_ppxhc_Btn.visible = true;
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
        if(!this._clickTag && WudianMgr.Wudian_ppxhc_Flag)
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
        ViewMgr.instance.openView(View_ppxhc_Def.MiniGameView,null,(v : MiniGameViewTemplate)=>
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