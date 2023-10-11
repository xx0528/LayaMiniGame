import Banner_ppxhc_AdView from "../../ShareAd/View/BannerAdView";

export default class Universal_ppxhc_BottomZone extends Laya.Script 
{

    protected _owner_ppxhc_Sprite : Laya.Sprite;
    protected _auto_ppxhc_Zone: Laya.UIComponent;
    protected _loop_ppxhc_ADZone: Laya.UIComponent;
    protected _banner_ppxhc_ADZone: Laya.UIComponent;
    protected _banner_ppxhc_Ad : Banner_ppxhc_AdView;

    onAwake()
    {
        this._owner_ppxhc_Sprite = this.owner as Laya.Sprite;
        this._auto_ppxhc_Zone = this._owner_ppxhc_Sprite.getChildByName("AutoZone") as Laya.UIComponent;
        this._loop_ppxhc_ADZone = this._owner_ppxhc_Sprite.getChildByName("LoopAD") as Laya.UIComponent; 
        this._banner_ppxhc_ADZone = this._owner_ppxhc_Sprite.getChildByName("BannerAD") as Laya.UIComponent; 
        this._banner_ppxhc_Ad = this._banner_ppxhc_ADZone.getComponent(Banner_ppxhc_AdView);
    }
    
    onEnable(): void 
    {
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5)
        {
            this._auto_ppxhc_Zone.bottom = this._loop_ppxhc_ADZone.height + this._banner_ppxhc_ADZone.height;
            this._loop_ppxhc_ADZone.bottom = this._banner_ppxhc_ADZone.height;
            this._banner_ppxhc_ADZone.visible = true;
        }
        else
        {
            this._auto_ppxhc_Zone.bottom = this._loop_ppxhc_ADZone.height;
            this._loop_ppxhc_ADZone.bottom = 0;
            this._banner_ppxhc_ADZone.visible = false;
        }
    }

    onDisable(): void 
    {

    }

    onUpdate()
    {
        if(!this._banner_ppxhc_ADZone.visible)
        {
            this._banner_ppxhc_Ad.clearWXBaner();
        }
    }
}