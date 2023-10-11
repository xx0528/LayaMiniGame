import WudianMgr from "../../../Mgr/WudianMgr";
import AppSwitchConfig from "../../../Config/AppSwitchConfig";
import WXADMgr, { WXBannder_ppxhc_Ad } from "../../../Mgr/WXADMgr";
import Utilit from "../../../Utilit";
import TTTemplateViewBase from "../TTTemplateViewBase";
import TTAPI from "../../../TTAPI";

export default class TTGameFailViewTemplate_ppxhc extends TTTemplateViewBase
{
    protected _centerZone_ppxhc : Laya.Clip = null;
    
    protected _clickTag_ppxhc : boolean = false;
    protected _clickTimingTag_ppxhc : boolean = false;

    protected _moreGameBtn_ppxhc : Laya.Sprite = null;
    protected _shareBtn_ppxhc : Laya.Sprite = null;

    protected _backBtn_ppxhc : Laya.Sprite = null;
    protected _okBtn_ppxhc : Laya.Sprite = null;
    protected _videoBtn_ppxhc : Laya.Sprite = null;
    

    onAwake()
    {
        super.onAwake();
        this._centerZone_ppxhc = this.View.getChildByName("CenterZone") as Laya.Clip;
        if(Utilit.isIphoneX_())
        {
            this._centerZone_ppxhc.top =  this._centerZone_ppxhc.top + 75;
        }

        this._moreGameBtn_ppxhc = this._centerZone_ppxhc.getChildByName("MoreGameBtn") as Laya.Clip;
        this._shareBtn_ppxhc = this._centerZone_ppxhc.getChildByName("ShareBtn") as Laya.Clip;

        this._backBtn_ppxhc = this._centerZone_ppxhc.getChildByName("BackBtn") as Laya.Sprite;
        this._okBtn_ppxhc = this._centerZone_ppxhc.getChildByName("OkBtn") as Laya.Sprite;
        this._videoBtn_ppxhc = this._centerZone_ppxhc.getChildByName("VideoBtn") as Laya.Sprite;

        this._moreGameBtn_ppxhc.visible = AppSwitchConfig.getInstance().getAppSwitchData().ttcfg.moreGameSwitch == 1;
    }

    onStart()
    {
        super.onStart();
        if(WudianMgr.Wudian_ppxhc_Flag)
        {
            let yPos = this._centerZone_ppxhc.height - 150;
            this._backBtn_ppxhc.y = yPos;
            this._okBtn_ppxhc.y = yPos;
            this._videoBtn_ppxhc.y = yPos;
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
        this._backBtn_ppxhc.on(Laya.Event.CLICK,this,this.onBackBtn);
        this._okBtn_ppxhc.on(Laya.Event.CLICK,this,this.onOkBtn);
        this._videoBtn_ppxhc.on(Laya.Event.CLICK,this,this.onOkBtn);
        
        this._moreGameBtn_ppxhc.on(Laya.Event.CLICK,this,this.onMoreGameBtn);
        this._shareBtn_ppxhc.on(Laya.Event.CLICK,this,this.onShareBtn);
    }

    removeEvent()
    {
        super.removeEvent();
        this._backBtn_ppxhc.off(Laya.Event.CLICK,this,this.onBackBtn);
        this._okBtn_ppxhc.off(Laya.Event.CLICK,this,this.onOkBtn);
        this._videoBtn_ppxhc.off(Laya.Event.CLICK,this,this.onOkBtn);
        
        this._moreGameBtn_ppxhc.off(Laya.Event.CLICK,this,this.onMoreGameBtn);
        this._shareBtn_ppxhc.off(Laya.Event.CLICK,this,this.onShareBtn);
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

    protected onOkBtn()
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


    protected onVideoBtn()
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
        this._clickTag_ppxhc = true;
        this._backBtn_ppxhc.y = 720;
        this._okBtn_ppxhc.y = 720;
        this._videoBtn_ppxhc.y = 720;
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