export default class KRQ__wcjtn_View_wcjtn_Com_wcjtn_Base extends Laya.Script 
{
    public on_wcjtn_Show : Function = null;
    public on_wcjtn_Hide : Function = null;
    
    public get _wcjtn_Sprite_wcjtn_()
    {
        return this.owner as Laya.Sprite;
    }
    
    public _wcjtn_show_wcjtn_()
    {
        this._wcjtn_Sprite_wcjtn_.visible = true;
        if(null != this.on_wcjtn_Show)
        {
            this.on_wcjtn_Show();
        }
    }

    public _wcjtn_hide_wcjtn_()
    {
        this._wcjtn_Sprite_wcjtn_.visible = false;
        if(null != this.on_wcjtn_Hide)
        {
            this.on_wcjtn_Hide();
        }
    }
}