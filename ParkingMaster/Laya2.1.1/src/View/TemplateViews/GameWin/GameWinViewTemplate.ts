import TemplateViewBase from "../TemplateViewBase";
import WXADMgr, { WXBannderAd } from "../../../Mgr/WXADMgr";
import WudianMgr from "../../../Mgr/WudianMgr";
import AppSwitchConfig from "../../../Config/AppSwitchConfig";
import KRQ_RollSingleAd from "../../../KRQ/Com/KRQ_RollSingleAd";
import Utilit from "../../../Utilit";
import ViewMgr, { ViewDef } from "../../../Mgr/ViewMgr";
import MiniGameViewTemplate from "../MiniGame/MiniGameViewTemplate";
import User from "../../../User/User";
import EventMgr from "../../../Event/EventMgr";
import { EventDef } from "../../../Event/EventDef";
import NativeCallback from "../../../NativeCallback";

export default class GameWinViewTemplate extends TemplateViewBase
{
    protected _centerZone : Laya.Clip = null;
    protected _backBtn : Laya.Sprite = null;
    protected _nextBtn : Laya.Sprite = null;
    // protected _rollSingleAds : Array<KRQ_RollSingleAd> = new Array<KRQ_RollSingleAd>();
    
    protected _clickTag : boolean = false;
    protected _clickTimingTag : boolean = false;

    protected _banner : WXBannderAd = null;
    
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
        this._backBtn.visible = false;
        // for (let i = 0; i < this._centerZone.numChildren; ++i) 
        // {
        //     let ad = this._centerZone.getChildAt(i).getComponent(KRQ_RollSingleAd) as KRQ_RollSingleAd;
        //     if (null == ad)
        //         continue;
        //     this._rollSingleAds.push(ad);
        // }

        if(WudianMgr.WudianFlag)
        {
            this.HistoryBtn.visible = false;
        }
    }

    onStart()
    {
        super.onStart();
        // if(WudianMgr.WudianFlag)
        // {
        //     let yPos = this._centerZone.height - 150;
        //     this._backBtn.y = yPos;
        //     this._nextBtn.y = yPos;
        // }

        // for (let i = 0; i < this._rollSingleAds.length; ++i)  
        // {
        //     let ad = this._rollSingleAds[i];
        //     Laya.timer.once(150,this,()=>
        //     {
        //         ad.playAni();
        //     })
        // }

        // var btnMoveTimer = AppSwitchConfig.getInstance().getAppSwitchData().btnMoveTimer;
        // var bannerMoveTimer = AppSwitchConfig.getInstance().getAppSwitchData().bannerMoveTimer;
        // Laya.timer.once(bannerMoveTimer * 1000,this,this.BannerUp);
        // Laya.timer.once(btnMoveTimer * 1000,this,this.BtnUp);
    }

    onEnable() {
        super.onEnable();
        EventMgr.instance.regEvemt(EventDef.InsertVideoEnd,this,this.onInsertVideoEnd);
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

    
    onInsertVideoEnd() {
        User.setLeveNum(User.getLeveNum() + 1);
        EventMgr.instance.dispatch(EventDef.Game_OnLevelStart);
        this.closeView();
    }


    protected onNextBtn()
    {
        // if(!this._clickTag && WudianMgr.WudianFlag)
        // {
        //     var self = this
        //     if(!this._clickTimingTag)
        //     {
        //         this._clickTimingTag = true
        //         var btnMoveTimer = AppSwitchConfig.getInstance().getAppSwitchData().btnMoveTimer;
        //         var bannerMoveTimer = AppSwitchConfig.getInstance().getAppSwitchData().bannerMoveTimer;
        //         Laya.timer.once(bannerMoveTimer * 1000,this,this.BannerUp);
        //         Laya.timer.once(btnMoveTimer * 1000,this,this.BtnUp);
        //     }
        //     return;
        // }

        //todo:你的代码
        if (User.getLeveNum() > 3) {
            var randNum = Math.random();
            if (Laya.Browser.onAndroid || Laya.Browser.onIOS && randNum > 0.1) {
                NativeCallback.CallNativeFunc("showInsertVideo");
                Laya.SoundManager.muted = true;
                return;
            }
        }
        
        User.setLeveNum(User.getLeveNum() + 1);
        EventMgr.instance.dispatch(EventDef.Game_OnLevelStart);
        this.closeView();
    }

    protected BannerUp()
    {
        // let self = this;
        // WXADMgr.getBanner((banner : WXBannderAd)=>
        // {
        //     if(null != self._banner)
        //     {
        //         self._banner.hide();
        //     }
        //     self._banner = banner
        //     if (null != self._banner) 
        //     {
        //         self._banner.show();
        //     }
        //     if(this.isShowHistoryBtn)
        //     {
        //         self.HistoryBtn.visible = true;
        //     }
        // });
    }

    protected BtnUp()
    {
        this._clickTag = true;
        this._backBtn.y = 720;
        this._nextBtn.y = 720;
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