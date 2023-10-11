import Banner_wcjtn_Ad_wcjtn_View from "../../ShareAd/View/BannerAdView";

export default class Universal_wcjtn_BottomZone extends Laya.Script 
{

    protected _owner_wcjtn_Sprite : Laya.Sprite;
    protected _auto_wcjtn_Zone: Laya.UIComponent;
    protected _loop_wcjtn_ADZone: Laya.UIComponent;
    protected _banner_wcjtn_ADZone: Laya.UIComponent;
    protected _banner_wcjtn_Ad : Banner_wcjtn_Ad_wcjtn_View;

    onAwake()
    {
        this._owner_wcjtn_Sprite = this.owner as Laya.Sprite;
        this._auto_wcjtn_Zone = this._owner_wcjtn_Sprite.getChildByName("AutoZone") as Laya.UIComponent;
        this._loop_wcjtn_ADZone = this._owner_wcjtn_Sprite.getChildByName("LoopAD") as Laya.UIComponent; 
        this._banner_wcjtn_ADZone = this._owner_wcjtn_Sprite.getChildByName("BannerAD") as Laya.UIComponent; 
        this._banner_wcjtn_Ad = this._banner_wcjtn_ADZone.getComponent(Banner_wcjtn_Ad_wcjtn_View);
    }
    
    onEnable(): void 
    {
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5)
        {
            this._auto_wcjtn_Zone.bottom = this._loop_wcjtn_ADZone.height + this._banner_wcjtn_ADZone.height;
            this._loop_wcjtn_ADZone.bottom = this._banner_wcjtn_ADZone.height;
            this._banner_wcjtn_ADZone.visible = true;
        }
        else
        {
            this._auto_wcjtn_Zone.bottom = this._loop_wcjtn_ADZone.height;
            this._loop_wcjtn_ADZone.bottom = 0;
            this._banner_wcjtn_ADZone.visible = false;
        }
    }

    onDisable(): void 
    {

    }

    onUpdate()
    {
        if(!this._banner_wcjtn_ADZone.visible)
        {
            this._banner_wcjtn_Ad.clear_wcjtn_WXBaner();
        }
    }
}