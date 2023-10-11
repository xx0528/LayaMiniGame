import WudianMgr from "../../../Mgr/WudianMgr";
import AppSwitchConfig from "../../../Config/AppSwitchConfig";
import WXADMgr, { WXBannderAd } from "../../../Mgr/WXADMgr";
import Utilit from "../../../Utilit";
import TTTemplateViewBase from "../TTTemplateViewBase";
import TTAPI from "../../../TTAPI";

export default class TTGameFailViewTemplate extends TTTemplateViewBase
{
    protected _centerZone : Laya.Clip = null;
    
    protected _clickTag : boolean = false;
    protected _clickTimingTag : boolean = false;

    protected _moreGameBtn : Laya.Sprite = null;
    protected _shareBtn : Laya.Sprite = null;

    protected _backBtn : Laya.Sprite = null;
    protected _okBtn : Laya.Sprite = null;
    protected _videoBtn : Laya.Sprite = null;
    

    onAwake()
    {
        super.onAwake();
        this._centerZone = this.View.getChildByName("CenterZone") as Laya.Clip;
        if(Utilit.isIphoneX())
        {
            this._centerZone.top =  this._centerZone.top + 75;
        }

        this._moreGameBtn = this._centerZone.getChildByName("MoreGameBtn") as Laya.Clip;
        this._shareBtn = this._centerZone.getChildByName("ShareBtn") as Laya.Clip;

        this._backBtn = this._centerZone.getChildByName("BackBtn") as Laya.Sprite;
        this._okBtn = this._centerZone.getChildByName("OkBtn") as Laya.Sprite;
        this._videoBtn = this._centerZone.getChildByName("VideoBtn") as Laya.Sprite;

        this._moreGameBtn.visible = AppSwitchConfig.getInstance().getAppSwitchData().ttcfg.moreGameSwitch == 1;
    }

    onStart()
    {
        super.onStart();
        if(WudianMgr.WudianFlag)
        {
            let yPos = this._centerZone.height - 150;
            this._backBtn.y = yPos;
            this._okBtn.y = yPos;
            this._videoBtn.y = yPos;
        }
        
        var btnMoveTimer = AppSwitchConfig.getInstance().getAppSwitchData().btnMoveTimer;
        var bannerMoveTimer = AppSwitchConfig.getInstance().getAppSwitchData().bannerMoveTimer;
        Laya.timer.once(bannerMoveTimer * 1000,this,this.BannerUp);
        Laya.timer.once(btnMoveTimer * 1000,this,this.BtnUp);

        if(AppSwitchConfig.getInstance().getAppSwitchData().ttcfg.luping == 1)
        {
            TTAPI.shareRecord(()=>
            {
                
            },()=>
            {
                
            })
        }
    }

    addEvent()
    {
        super.addEvent();
        this._backBtn.on(Laya.Event.CLICK,this,this.onBackBtn);
        this._okBtn.on(Laya.Event.CLICK,this,this.onOkBtn);
        this._videoBtn.on(Laya.Event.CLICK,this,this.onOkBtn);
        
        this._moreGameBtn.on(Laya.Event.CLICK,this,this.onMoreGameBtn);
        this._shareBtn.on(Laya.Event.CLICK,this,this.onShareBtn);
    }

    removeEvent()
    {
        super.removeEvent();
        this._backBtn.off(Laya.Event.CLICK,this,this.onBackBtn);
        this._okBtn.off(Laya.Event.CLICK,this,this.onOkBtn);
        this._videoBtn.off(Laya.Event.CLICK,this,this.onOkBtn);
        
        this._moreGameBtn.off(Laya.Event.CLICK,this,this.onMoreGameBtn);
        this._shareBtn.off(Laya.Event.CLICK,this,this.onShareBtn);
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

    protected onOkBtn()
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


    protected onVideoBtn()
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

        TTAPI.shareRecord(()=>
        {
            
        },()=>
        {
            
        })
    }

    protected BannerUp()
    {
        TTAPI.showBanner();
    }

    protected BtnUp()
    {
        this._clickTag = true;
        this._backBtn.y = 720;
        this._okBtn.y = 720;
        this._videoBtn.y = 720;
    }

    protected onMoreGameBtn()
    {
        TTAPI.showMoreGamesModal(()=>
        {
            
        },()=>
        {

        })
    }

    protected onShareBtn()
    {
        TTAPI.share(()=>
        {

        })
    }

    onDestroy()
    {
        TTAPI.hideBanner();
    }
}