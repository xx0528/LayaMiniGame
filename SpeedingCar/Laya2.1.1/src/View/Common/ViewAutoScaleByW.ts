export default class ViewAutoScaleByW extends Laya.Script 
{
    public static readonly  baseWidth = 750;
    public static readonly  baseHeight = 1334;

    onAwake()
    {
        var realW = Laya.stage.width;
        var scale = realW / ViewAutoScaleByW.baseWidth;
        var ps = this.owner as Laya.Sprite;
        ps.scale(scale,scale);
    }
}