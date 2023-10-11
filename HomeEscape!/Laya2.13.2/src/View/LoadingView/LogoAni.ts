import ryw_AppConfig from "../../AppConfig";

export default class ryw_LogoAni extends Laya.Script 
{
    protected readonly ryw__aniSprites : Array<Laya.Sprite> = [];
    protected readonly ryw__aniSpriteOriginPos : Array<Laya.Point> = [];

    onAwake()
    {
        for (let i = 0; i < this.owner.numChildren; ++i)  
        {
            let child = this.owner.getChildAt(i) as Laya.Sprite;
            child.alpha = 0;
            this.ryw__aniSprites.push(child);
            this.ryw__aniSpriteOriginPos.push(new Laya.Point(child.x,child.y));
        }
    }

    public ryw_playAni()
    {
        if(ryw_AppConfig.showLoadingLogo)
        {
            for (let i = 0; i < this.ryw__aniSprites.length; ++i)  
            { 
                this.ryw__aniSprites[i].visible = false;
            }
            return;
        }
        for (let i = 0; i < this.ryw__aniSprites.length; ++i)  
        {   
            let isLast = i == (this.ryw__aniSprites.length - 1) ? true : false;
            let sp = this.ryw__aniSprites[i];
            let originPos = this.ryw__aniSpriteOriginPos[i];
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
                            self.ryw_playAni();
                        })
                    }
                }),i * 80)
        }
    }
}