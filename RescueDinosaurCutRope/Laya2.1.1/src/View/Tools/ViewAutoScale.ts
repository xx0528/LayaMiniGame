export default class View_JJKLBB_Auto_JJKLBB_Scale extends Laya.Script 
{
    public static readonly  baseWidth = 750;
    public static readonly  baseHeight = 1334;

    onAwake()
    {
        var realH = Laya.stage.height;
        var scale = realH / View_JJKLBB_Auto_JJKLBB_Scale.baseHeight;
        var ps = this.owner as Laya.Sprite;
        ps.scale(scale,scale);
    }
}