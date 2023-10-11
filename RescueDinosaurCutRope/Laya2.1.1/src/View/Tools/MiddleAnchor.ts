export default class Middle_JJKLBB_Anchor extends Laya.Script 
{
    onAwake()
    {
        var sp = this.owner as Laya.Sprite;
        var parentSp = this.owner.parent as Laya.Sprite;
        if(parentSp)
        {
            var pw = parentSp.width;
            var x = pw / 2;
            sp.x = x;
        }
    }
}