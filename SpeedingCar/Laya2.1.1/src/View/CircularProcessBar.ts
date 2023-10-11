//环形进度条，只支持纯色
export default class Circular_wcjtn_ProcessBar extends Laya.Script {
    public color_wcjtn_: string = "#7CFC00";
    public line_wcjtn_Color: string = "#ffffff";
    public line_wcjtn_Width: number = 6;
    protected _owner_wcjtn_Sprite: Laya.Sprite = null;
    protected _value_wcjtn_ = 0;
    protected _mask: Laya.Sprite;

    /** @prop {name:bgColor,tips:"背景色",type:Color}*/
    // 返回颜色值
    public bgColor: Laya.Color;

    onAwake()  {
        this._owner_wcjtn_Sprite = this.owner as Laya.Sprite;
        this._mask = this.owner.getChildByName("circleMask") as Laya.Sprite;
        let x = this.line_wcjtn_Width * 1.9;
        this._mask.graphics.drawCircle(x, x, this._owner_wcjtn_Sprite.width / 2 - this.line_wcjtn_Width * 1.5, this.bgColor);
    }

    hide(){
        this._owner_wcjtn_Sprite.visible = false;
    }

    public set_wcjtn_Value(value: number)  {
        if (value > 1)
            value = 1;
        if (value < 0)
            value = 0;
        var angle = 360 * (1 - value) + 90;
        if (null == this._owner_wcjtn_Sprite)
            this._owner_wcjtn_Sprite = this.owner as Laya.Sprite;
        this._owner_wcjtn_Sprite.graphics.clear();
        this._owner_wcjtn_Sprite.graphics.drawPie(this._owner_wcjtn_Sprite.width / 2, this._owner_wcjtn_Sprite.height / 2, this._owner_wcjtn_Sprite.width / 2,
            360 - angle,
            270,
            null, this.line_wcjtn_Color, this.line_wcjtn_Width);
    }
}