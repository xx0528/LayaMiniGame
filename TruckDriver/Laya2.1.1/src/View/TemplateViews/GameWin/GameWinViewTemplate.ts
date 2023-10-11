import TemplateViewBase from "../TemplateViewBase";
import WXADMgr, { WXBannder_ppxhc_Ad } from "../../../Mgr/WXADMgr";
import WudianMgr from "../../../Mgr/WudianMgr";
import AppSwitchConfig from "../../../Config/AppSwitchConfig";
import KRQ_RollSingleAd from "../../../KRQ/Com/KRQ_RollSingleAd";
import Utilit from "../../../Utilit";
import ViewMgr, { View_ppxhc_Def } from "../../../Mgr/ViewMgr";
import MiniGameViewTemplate from "../MiniGame/MiniGameViewTemplate";

export default class GameWinViewTemplate extends TemplateViewBase
{
    protected _centerZone : Laya.Clip = null;
    protected _back_ppxhc_Btn : Laya.Sprite = null;
    protected _next_ppxhc_Btn : Laya.Sprite = null;
    protected _rollSingleAds : Array<KRQ_RollSingleAd> = new Array<KRQ_RollSingleAd>();
    
    protected _click_ppxhc_Tag : boolean = false;
    protected _clickTiming_ppxhc_Tag : boolean = false;

    protected _banner : WXBannder_ppxhc_Ad = null;
    
    onAwake()
    {
        super.onAwake();
        this._centerZone = this.View.getChildByName("CenterZone") as Laya.Clip;
        if(Utilit.isIphoneX_())
        {
            this._centerZone.top =  this._centerZone.top + 75;
        }

        this._back_ppxhc_Btn = this._centerZone.getChildByName("BackBtn") as Laya.Sprite;
        this._next_ppxhc_Btn = this._centerZone.getChildByName("NextBtn") as Laya.Sprite;

        for (let i = 0; i < this._centerZone.numChildren; ++i) 
        {
            let ad = this._centerZone.getChildAt(i).getComponent(KRQ_RollSingleAd) as KRQ_RollSingleAd;
            if (null == ad)
                continue;
            this._rollSingleAds.push(ad);
        }

        if(WudianMgr.Wudian_ppxhc_Flag)
        {
            this.History_ppxhc_Btn.visible = false;
        }
    }

    onStart()
    {
        super.onStart();
        if(WudianMgr.Wudian_ppxhc_Flag)
        {
            let yPos = this._centerZone.height - 150;
            this._back_ppxhc_Btn.y = yPos;
            this._next_ppxhc_Btn.y = yPos;
        }

        for (let i = 0; i < this._rollSingleAds.length; ++i)  
        {
            let ad = this._rollSingleAds[i];
            Laya.timer.once(150,this,()=>
            {
                ad.play_ppxhc_Ani();
            })
        }

        var btnMoveTimer = AppSwitchConfig.getInstance().getAppSwitchData().btnMoveTimer;
        var bannerMoveTimer = AppSwitchConfig.getInstance().getAppSwitchData().bannerMoveTimer;
        // Laya.timer.once(bannerMoveTimer * 1000,this,this.BannerUp);
        // Laya.timer.once(btnMoveTimer * 1000,this,this.BtnUp);
    }

    addEvent()
    {
        super.addEvent();
        this._back_ppxhc_Btn.on(Laya.Event.CLICK,this,this.onBackBtn);
        this._next_ppxhc_Btn.on(Laya.Event.CLICK,this,this.onNextBtn);
    }

    removeEvent()
    {
        super.removeEvent();
        this._back_ppxhc_Btn.off(Laya.Event.CLICK,this,this.onBackBtn);
        this._next_ppxhc_Btn.off(Laya.Event.CLICK,this,this.onNextBtn);
    }

    protected onBackBtn()
    {
        if(!this._click_ppxhc_Tag && WudianMgr.Wudian_ppxhc_Flag)
        {
            var self = this
            if(!this._clickTiming_ppxhc_Tag)
            {
                this._clickTiming_ppxhc_Tag = true
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
        if(!this._click_ppxhc_Tag && WudianMgr.Wudian_ppxhc_Flag)
        {
            var self = this
            if(!this._clickTiming_ppxhc_Tag)
            {
                this._clickTiming_ppxhc_Tag = true
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
        this._click_ppxhc_Tag = true;
        this._back_ppxhc_Btn.y = 720;
        this._next_ppxhc_Btn.y = 720;
    }

    onDestroy()
    {
        if(null != this._banner)
        {
            this._banner.hide();
        }
        this._banner = null;
    }

    protected onHistory_ppxhc_Btn()
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