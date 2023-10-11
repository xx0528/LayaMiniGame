export default class KRQ_ViewComBase extends Laya.Script 
{
    public onShow : Function = null;
    public onHide : Function = null;
    
    public get Sprite()
    {
        return this.owner as Laya.Sprite;
    }
    
    public show()
    {
        this.Sprite.visible = true;
        if(null != this.onShow)
        {
            this.onShow();
        }
    }

    public hide()
    {
        this.Sprite.visible = false;
        if(null != this.onHide)
        {
            this.onHide();
        }
    }
}