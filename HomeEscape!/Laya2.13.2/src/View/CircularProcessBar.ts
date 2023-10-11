//环形进度条，只支持纯色
export default class ryw_CircularProcessBar extends Laya.Script
{
    public ryw_color : string = "#7CFC00";
    public ryw_lineColor : string = "";
    public ryw_lineWidth : number = 0;
    protected ryw__ownerSprite : Laya.Sprite = null;
    protected ryw__value = 0;

    onAwake()
    {
        this.ryw__ownerSprite = this.owner as Laya.Sprite;
    }
    
    onEnable(): void 
    {

    }

    onDisable(): void 
    {

    }

    public ryw_setValue(value : number)
    {
        if(value > 1)
            value = 1;
        if(value < 0)
            value = 0;
        var angle = 360 * (1 -  value) - 90;
        if(null == this.ryw__ownerSprite)
            this.ryw__ownerSprite =  this.owner as Laya.Sprite;
        this.ryw__ownerSprite.graphics.clear();
        this.ryw__ownerSprite.graphics.drawPie(this.ryw__ownerSprite.width/ 2,this.ryw__ownerSprite.height / 2,this.ryw__ownerSprite.width / 2,
                angle,
                270,
                this.ryw_color,this.ryw_lineColor,this.ryw_lineWidth);
    }
}