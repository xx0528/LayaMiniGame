//环形进度条，只支持纯色
export default class Circul_XYXZS_arProcessBar extends Laya.Script
{
    public c_XYXZS_olor : string = "#7CFC00";
    public li_XYXZS_neColor : string = "";
    public lin_XYXZS_eWidth : number = 0;
    protected _owner_XYXZS_Sprite : Laya.Sprite = null;
    protected _va_XYXZS_lue = 0;

    onAwake()
    {
        this._owner_XYXZS_Sprite = this.owner as Laya.Sprite;
    }
    
    onEnable(): void 
    {

    }

    onDisable(): void 
    {

    }

    public set_XYXZS_Value(value : number)
    {
        if(value > 1)
            value = 1;
        if(value < 0)
            value = 0;
        var angle = 360 * (1 -  value) - 90;
        if(null == this._owner_XYXZS_Sprite)
            this._owner_XYXZS_Sprite =  this.owner as Laya.Sprite;
        this._owner_XYXZS_Sprite.graphics.clear();
        this._owner_XYXZS_Sprite.graphics.drawPie(this._owner_XYXZS_Sprite.width/ 2,this._owner_XYXZS_Sprite.height / 2,this._owner_XYXZS_Sprite.width / 2,
                angle,
                270,
                this.c_XYXZS_olor,this.li_XYXZS_neColor,this.lin_XYXZS_eWidth);
    }
}