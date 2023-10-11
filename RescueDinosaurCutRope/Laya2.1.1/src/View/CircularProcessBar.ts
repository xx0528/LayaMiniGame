//环形进度条，只支持纯色
export default class Circular_JJKLBB_ProcessBar extends Laya.Script
{
    public co_JJKLBB_lor : string = "#7CFC00";
    public lineC_JJKLBB_olor : string = "";
    public lineW_JJKLBB_idth : number = 0;
    protected _owner_JJKLBB_Sprite : Laya.Sprite = null;
    protected _val_JJKLBB_ue = 0;

    onAwake()
    {
        this._owner_JJKLBB_Sprite = this.owner as Laya.Sprite;
    }
    
    onEnable(): void 
    {

    }

    onDisable(): void 
    {

    }

    public setV_JJKLBB_alue(value : number)
    {
        if(value > 1)
            value = 1;
        if(value < 0)
            value = 0;
        var angle = 360 * (1 -  value) - 90;
        if(null == this._owner_JJKLBB_Sprite)
            this._owner_JJKLBB_Sprite =  this.owner as Laya.Sprite;
        this._owner_JJKLBB_Sprite.graphics.clear();
        this._owner_JJKLBB_Sprite.graphics.drawPie(this._owner_JJKLBB_Sprite.width/ 2,this._owner_JJKLBB_Sprite.height / 2,this._owner_JJKLBB_Sprite.width / 2,
                angle,
                270,
                this.co_JJKLBB_lor,this.lineC_JJKLBB_olor,this.lineW_JJKLBB_idth);
    }
}