import ryw_TemplateViewBase from "../TemplateViewBase";
import ryw_WXADMgr, { ryw_WXBannderAd } from "../../../Mgr/WXADMgr";
import ryw_WudianMgr from "../../../Mgr/WudianMgr";
import ryw_AppSwitchConfig from "../../../Config/AppSwitchConfig";
import ryw_KRQ_RollSingleAd from "../../../KRQ/Com/KRQ_RollSingleAd";
import ryw_Utilit from "../../../Utilit";
import ryw_ViewMgr, { ryw_ViewDef } from "../../../Mgr/ViewMgr";
import ryw_MiniGameViewTemplate from "../MiniGame/MiniGameViewTemplate";
import ryw_ViewBase from "../../ViewBase";
import NativeCallback from "../../../NativeCallback";
import ryw_SoundMgr from "../../../Mgr/SoundMgr";
import { ryw_EventDef } from "../../../Event/EventDef";
import ryw_EventMgr from "../../../Event/EventMgr";

export default class ryw_GameWinViewTemplate extends ryw_TemplateViewBase
{
    protected ryw__centerZone : Laya.Clip = null;
    protected ryw__backBtn : Laya.Sprite = null;
    protected ryw__nextBtn : Laya.Sprite = null;
    // protected ryw__rollSingleAds : Array<ryw_KRQ_RollSingleAd> = new Array<ryw_KRQ_RollSingleAd>();
    
    protected ryw__clickTag : boolean = false;
    protected ryw__clickTimingTag : boolean = false;

    protected ryw__banner : ryw_WXBannderAd = null;
    
    onAwake()
    {
        super.onAwake();
        this.ryw__centerZone = this.ryw_View.getChildByName("CenterZone") as Laya.Clip;
        if(ryw_Utilit.ryw_isIphoneX())
        {
            this.ryw__centerZone.top =  this.ryw__centerZone.top + 75;
        }

        this.ryw__backBtn = this.ryw__centerZone.getChildByName("BackBtn") as Laya.Sprite;
        this.ryw__nextBtn = this.ryw__centerZone.getChildByName("NextBtn") as Laya.Sprite;

        // for (let i = 0; i < this.ryw__centerZone.numChildren; ++i) 
        // {
        //     let ad = this.ryw__centerZone.getChildAt(i).getComponent(ryw_KRQ_RollSingleAd) as ryw_KRQ_RollSingleAd;
        //     if (null == ad)
        //         continue;
        //     this.ryw__rollSingleAds.push(ad);
        // }

        // if(ryw_WudianMgr.ryw_WudianFlag)
        // {
        //     this.ryw_HistoryBtn.visible = false;
        // }
    }

    onStart()
    {
        super.onStart();
        // if(ryw_WudianMgr.ryw_WudianFlag)
        // {
        //     let yPos = this.ryw__centerZone.height - 150;
        //     this.ryw__backBtn.y = yPos;
        //     this.ryw__nextBtn.y = yPos;
        // }

        // for (let i = 0; i < this.ryw__rollSingleAds.length; ++i)  
        // {
        //     let ad = this.ryw__rollSingleAds[i];
        //     Laya.timer.once(150,this,()=>
        //     {
        //         ad.ryw_playAni();
        //     })
        // }

        // var btnMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_btnMoveTimer;
        // var bannerMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerMoveTimer;
        // Laya.timer.once(bannerMoveTimer * 1000,this,this.ryw_BannerUp);
        // Laya.timer.once(btnMoveTimer * 1000,this,this.ryw_BtnUp);
    }

    onEnable() {
        super.onEnable();
        ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.InsertVideoEnd,this,this.onInsertVideoEnd);
    }

    onInsertVideoEnd() {
        var self = this;
        ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.GameView, null, (v:ryw_ViewBase)=>{
            (v.owner as Laya.View).zOrder = 1;
            self.ryw_closeView();
        });
        ryw_SoundMgr.ryw_instance.ryw_playBGM("bg");
        NativeCallback.CallNativeFunc("loadNextAd");
    }

    ryw_addEvent()
    {
        super.ryw_addEvent();
        this.ryw__backBtn.on(Laya.Event.CLICK,this,this.ryw_onBackBtn);
        this.ryw__nextBtn.on(Laya.Event.CLICK,this,this.ryw_onNextBtn);
    }

    ryw_removeEvent()
    {
        super.ryw_removeEvent();
        this.ryw__backBtn.off(Laya.Event.CLICK,this,this.ryw_onBackBtn);
        this.ryw__nextBtn.off(Laya.Event.CLICK,this,this.ryw_onNextBtn);
    }

    protected ryw_onBackBtn()
    {
        // if(!this.ryw__clickTag && ryw_WudianMgr.ryw_WudianFlag)
        // {
        //     var self = this
        //     if(!this.ryw__clickTimingTag)
        //     {
        //         this.ryw__clickTimingTag = true
        //         var btnMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_btnMoveTimer;
        //         var bannerMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerMoveTimer;
        //         Laya.timer.once(bannerMoveTimer * 1000,this,this.ryw_BannerUp);
        //         Laya.timer.once(btnMoveTimer * 1000,this,this.ryw_BtnUp);
        //     }
        //     return;
        // }

        //todo:你的代码
    }

    protected ryw_onNextBtn()
    {
        // if(!this.ryw__clickTag && ryw_WudianMgr.ryw_WudianFlag)
        // {
        //     var self = this
        //     if(!this.ryw__clickTimingTag)
        //     {
        //         this.ryw__clickTimingTag = true
        //         var btnMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_btnMoveTimer;
        //         var bannerMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerMoveTimer;
        //         Laya.timer.once(bannerMoveTimer * 1000,this,this.ryw_BannerUp);
        //         Laya.timer.once(btnMoveTimer * 1000,this,this.ryw_BtnUp);
        //     }
        //     return;
        // }

        //todo:你的代码
        //todo:你的代码
        // var self = this;
        // ryw_ViewMgr.ryw_instance.ryw_openView(ViewDef.GameView, null, (v:ViewBase)=>{
        //     (v.owner as Laya.View).zOrder = 1;
        //     self.closeView();
        // });

        var randNum = Math.random();
        console.log("随机数值 ===========" + randNum);
        // randNum = 0.46;
        if ((Laya.Browser.onAndroid || Laya.Browser.onIOS) && randNum > 0.6) {
            NativeCallback.CallNativeFunc("showInsertVideo");
            NativeCallback.NowVideoType = "insertAd";
            ryw_SoundMgr.ryw_instance.ryw_stopBGM();
        }
        else {
            var self = this;
            ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.GameView, null, (v:ryw_ViewBase)=>{
                (v.owner as Laya.View).zOrder = 1;
                self.ryw_closeView();
            });
        }
    }

    protected ryw_BannerUp()
    {
        // let self = this;
        // ryw_WXADMgr.ryw_getBanner((banner : ryw_WXBannderAd)=>
        // {
        //     if(null != self.ryw__banner)
        //     {
        //         self.ryw__banner.ryw_hide();
        //     }
        //     self.ryw__banner = banner
        //     if (null != self.ryw__banner) 
        //     {
        //         self.ryw__banner.ryw_show();
        //     }
        //     if(this.isShowHistoryBtn)
        //     {
        //         self.ryw_HistoryBtn.visible = true;
        //     }
        // });
    }

    protected ryw_BtnUp()
    {
        this.ryw__clickTag = true;
        this.ryw__backBtn.y = 720;
        this.ryw__nextBtn.y = 720;
    }

    onDestroy()
    {
        // if(null != this.ryw__banner)
        // {
        //     this.ryw__banner.ryw_hide();
        // }
        // this.ryw__banner = null;
    }

    protected ryw_onHistoryBtn()
    {
        // let self = this;
        // ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.ryw_MiniGameView,null,(v : ryw_MiniGameViewTemplate)=>
        // {
        //     self.ryw_hide();
        //     if(null != self.ryw__banner)
        //     {
        //         self.ryw__banner.ryw_hide();
        //     }
        //     v.ryw_onCloseEvent = ()=>
        //     {
        //         if(null != self.ryw_View && !self.ryw_View.destroyed)
        //         {
        //             self.ryw_show();
        //             if(null != self.ryw__banner)
        //             {
        //                 self.ryw__banner.ryw_show();
        //             }
        //         }
        //     }
        // })
    }
}