import BannerAdView from "../../ShareAd/View/BannerAdView";

export default class MyBannerZone extends Laya.Script 
{

    protected _ownerSprite : Laya.Sprite;

    onAwake()
    {
        this._ownerSprite = this.owner as Laya.Sprite;
    }
    
    onEnable(): void 
    {
        // var aspectRatio = Laya.stage.width / Laya.stage.height;
        // if(aspectRatio  < 0.5)
        // {
        //     this._ownerSprite.visible = true;
        // }
        // else
        // {
        //     this._ownerSprite.visible = false;
            
        // }
    }

    onDisable(): void 
    {

    }

    onUpdate()
    {
        
    }
}