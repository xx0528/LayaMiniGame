import AppConfig from "../../AppConfig";

export default class LogoAni extends Laya.Script 
{
    protected readonly _aniSprites : Array<Laya.Sprite> = [];
    protected readonly _aniSpriteOriginPos : Array<Laya.Point> = [];

    onAwake()
    {
        for (let i = 0; i < this.owner.numChildren; ++i)  
        {
            let child = this.owner.getChildAt(i) as Laya.Sprite;
            child.alpha = 0;
            this._aniSprites.push(child);
            this._aniSpriteOriginPos.push(new Laya.Point(child.x,child.y));
        }
    }

    public playAni()
    {
        if(AppConfig.showLoadingLogo)
        {
            for (let i = 0; i < this._aniSprites.length; ++i)  
            { 
                this._aniSprites[i].visible = false;
            }
            return;
        }
        for (let i = 0; i < this._aniSprites.length; ++i)  
        {   
            let isLast = i == (this._aniSprites.length - 1) ? true : false;
            let sp = this._aniSprites[i];
            let originPos = this._aniSpriteOriginPos[i];
            sp.alpha = 0;
            sp.y += originPos.y + 50;
            let self = this;
            Laya.Tween.to(sp,
                {
                    y: originPos.y,
                    alpha: 1
                },
                450, Laya.Ease.elasticOut, Laya.Handler.create(this, () => {
                    if(isLast)
                    {
                        Laya.timer.once(300,self,()=>
                        {
                            self.playAni();
                        })
                    }
                }),i * 80)
        }
    }
}