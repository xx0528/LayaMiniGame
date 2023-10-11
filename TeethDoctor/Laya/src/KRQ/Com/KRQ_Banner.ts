import KRQ__XYXZS_ComBase from "./KRQ_ComBase";
import IViewSt_XYXZS_ateListener from "../../View/IViewStateListener";
import W_XYXZS_XAPI from "../../WXAPI";
import AppSwi_XYXZS_tchConfig from "../../Config/AppSwitchConfig";
import Shar_XYXZS_eAd from "../../ShareAd/ShareAd";

export default class KRQ__XYXZS_Banner extends KRQ__XYXZS_ComBase implements IViewSt_XYXZS_ateListener
{
    public get C_XYXZS_lip()
    {
        return this.owner as Laya.Clip;
    }
    protected _wxB_XYXZS_anner : any = null;

    onAwake()
    {
        this.AdP_XYXZS_osID = Shar_XYXZS_eAd.Banner_XYXZS_AdLocationID;
    }

    onStart()
    {
        this.re_XYXZS_fres();
    }

    onEnable()
    {
        this.Sp_XYXZS_rite.on(Laya.Event.CLICK,this,this.onCl_XYXZS_ickAd)
    }

    onDisable()
    {
        this.Sp_XYXZS_rite.off(Laya.Event.CLICK,this,this.onCl_XYXZS_ickAd)
    }

    protected onCl_XYXZS_ickAd()
    {
        this.navigateT_XYXZS_oMiniProgram();
    }

    public re_XYXZS_fres(onComplate? : Function)
    {
        super.re_XYXZS_fres(()=>
        {
            var banner = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().ba_XYXZS_nner;
            if (1 == banner)
            {
                if(null == this._wxB_XYXZS_anner)
                {
                    this.refres_XYXZS_hWXBanner();
                }
            }
            else
            {
                this.refres_XYXZS_hBanner();
            }
        })
    }

    protected refres_XYXZS_hBanner()
    {        
        if(!this.Sp_XYXZS_rite.visible)
            return;
        if(null != this._d_XYXZS_ata)
        {
            let self = this;
            this.Sp_XYXZS_rite.loadImage(this._d_XYXZS_ata.logo,Laya.Handler.create(this,function()
            {
                if(null != self.Sp_XYXZS_rite && !self.Sp_XYXZS_rite.destroyed)
                {
                    self.Sp_XYXZS_rite.width = 600;
                    self.Sp_XYXZS_rite.height = 205;
                }
            }));
        }
    }

    protected refres_XYXZS_hWXBanner()
    {
        if(!Laya.Browser.onMiniGame || !this.Sp_XYXZS_rite.visible)
            return;
        this.clear_XYXZS_WXBaner();
        let self = this;
        let sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
        let sw = sysInfo.screenWidth;
        let sh = sysInfo.screenHeight;
        let pos = this.Sp_XYXZS_rite.localToGlobal(new Laya.Point(0,0))
        let width = 300;
        let scale = self.Sp_XYXZS_rite.width / Laya.stage.width;
        let realWidth = sw * scale;
        let offset = (realWidth - width) / 2;
        let left = pos.x / Laya.stage.width * sw + offset;
        let top = pos.y / Laya.stage.height * sh;

        this._wxB_XYXZS_anner = Laya.Browser.window["wx"].createBannerAd(
            {
                adUnitId : W_XYXZS_XAPI.bann_XYXZS_erAdUnitId,
                adIntervals : 30,
                style : 
                {
                    left:left,
                    top:top,
                    width: width,
                }
            })
            self._wxB_XYXZS_anner.onLoad((res) =>  {
            console.log("KRQ  WXBanner广告 加载完成 : ", W_XYXZS_XAPI.bann_XYXZS_erAdUnitId);
            console.log(res);
        })
        if(null != this._wxB_XYXZS_anner)
        {
            this._wxB_XYXZS_anner.onError((err) =>  {
                console.log("KRQ WXBanner广告 加载失败 : ", W_XYXZS_XAPI.bann_XYXZS_erAdUnitId);
                console.log(err);
                self.refres_XYXZS_hBanner();
                self.clear_XYXZS_WXBaner();
            })
            this._wxB_XYXZS_anner.onResize(res => {
    
              })
            this._wxB_XYXZS_anner.show();
        }
        else
        {
            this.refres_XYXZS_hBanner();
        }
    }
    
    protected clear_XYXZS_WXBaner()
    {
        if(this._wxB_XYXZS_anner)
        {
            this._wxB_XYXZS_anner.destroy();
        }
        this._wxB_XYXZS_anner = null;
    }

    public onView__XYXZS_XYXZS_Show()
    {
        let banner = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().ba_XYXZS_nner;
        if (1 == banner && null == this._wxB_XYXZS_anner)
        {
            this.refres_XYXZS_hWXBanner();
        }
    }

    public onViewHide()
    {
        this.clear_XYXZS_WXBaner();
    }

    onDestroy()
    {
        this.clear_XYXZS_WXBaner();
    }

    public show()
    {
        super.show();
        this.onView__XYXZS_XYXZS_Show();
    }

    public hide()
    {
        super.hide();
        this.onViewHide();
    }
}