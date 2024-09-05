import ryw_BannerAdView from "../../ShareAd/View/BannerAdView";

export default class ryw_UniversalBottomZone extends Laya.Script 
{

    protected ryw__ownerSprite : Laya.Sprite;
    protected ryw__autoZone: Laya.UIComponent;
    protected ryw__loopADZone: Laya.UIComponent;
    protected ryw__bannerADZone: Laya.UIComponent;
    protected ryw__bannerAd : ryw_BannerAdView;

    onAwake()
    {
        this.ryw__ownerSprite = this.owner as Laya.Sprite;
        this.ryw__autoZone = this.ryw__ownerSprite.getChildByName("AutoZone") as Laya.UIComponent;
        this.ryw__loopADZone = this.ryw__ownerSprite.getChildByName("LoopAD") as Laya.UIComponent; 
        this.ryw__bannerADZone = this.ryw__ownerSprite.getChildByName("BannerAD") as Laya.UIComponent; 
        this.ryw__bannerAd = this.ryw__bannerADZone.getComponent(ryw_BannerAdView);
    }
    
    onEnable(): void 
    {
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5)
        {
            this.ryw__autoZone.bottom = this.ryw__loopADZone.height + this.ryw__bannerADZone.height;
            this.ryw__loopADZone.bottom = this.ryw__bannerADZone.height;
            this.ryw__bannerADZone.visible = true;
        }
        else
        {
            this.ryw__autoZone.bottom = this.ryw__loopADZone.height;
            this.ryw__loopADZone.bottom = 0;
            this.ryw__bannerADZone.visible = false;
        }
    }

    onDisable(): void 
    {

    }

    onUpdate()
    {
        if(!this.ryw__bannerADZone.visible)
        {
            this.ryw__bannerAd.ryw_clearWXBaner();
        }
    }
}