export default class ryw_KRQ_ViewComBase extends Laya.Script 
{
    public ryw_onShow : Function = null;
    public ryw_onHide : Function = null;
    
    public get ryw_Sprite()
    {
        return this.owner as Laya.Sprite;
    }
    
    public ryw_show()
    {
        this.ryw_Sprite.visible = true;
        if(null != this.ryw_onShow)
        {
            this.ryw_onShow();
        }
    }

    public ryw_hide()
    {
        this.ryw_Sprite.visible = false;
        if(null != this.ryw_onHide)
        {
            this.ryw_onHide();
        }
    }
}