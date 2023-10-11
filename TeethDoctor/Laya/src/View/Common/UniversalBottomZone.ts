import Banne_XYXZS_rAdView from "../../ShareAd/View/BannerAdView";

export default class Unive_XYXZS_rsalBottomZone extends Laya.Script 
{

    protected _owne_XYXZS_rSprite : Laya.Sprite;
    protected _aut_XYXZS_oZone: Laya.UIComponent;
    protected _loop_XYXZS_ADZone: Laya.UIComponent;
    protected _bann_XYXZS_erADZone: Laya.UIComponent;
    protected _bann_XYXZS_erAd : Banne_XYXZS_rAdView;

    onAwake()
    {
        this._owne_XYXZS_rSprite = this.owner as Laya.Sprite;
        this._aut_XYXZS_oZone = this._owne_XYXZS_rSprite.getChildByName("AutoZone") as Laya.UIComponent;
        this._loop_XYXZS_ADZone = this._owne_XYXZS_rSprite.getChildByName("LoopAD") as Laya.UIComponent; 
        this._bann_XYXZS_erADZone = this._owne_XYXZS_rSprite.getChildByName("BannerAD") as Laya.UIComponent; 
        this._bann_XYXZS_erAd = this._bann_XYXZS_erADZone.getComponent(Banne_XYXZS_rAdView);
    }
    
    onEnable(): void 
    {
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5)
        {
            this._aut_XYXZS_oZone.bottom = this._loop_XYXZS_ADZone.height + this._bann_XYXZS_erADZone.height;
            this._loop_XYXZS_ADZone.bottom = this._bann_XYXZS_erADZone.height;
            this._bann_XYXZS_erADZone.visible = true;
        }
        else
        {
            this._aut_XYXZS_oZone.bottom = this._loop_XYXZS_ADZone.height;
            this._loop_XYXZS_ADZone.bottom = 0;
            this._bann_XYXZS_erADZone.visible = false;
        }
    }

    onDisable(): void 
    {

    }

    onUpdate()
    {
        if(!this._bann_XYXZS_erADZone.visible)
        {
            this._bann_XYXZS_erAd.clear_XYXZS_WXBaner();
        }
    }
}