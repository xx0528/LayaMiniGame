import KRQ__wcjtn_Com_wcjtn_Base from "../KRQ_ComBase";

export default class KRQ_wcjtn__Loop_wcjtn_Ad_wcjtn_Box extends KRQ__wcjtn_Com_wcjtn_Base
{
    protected _display_wcjtn_Sp : Laya.Sprite;
    protected _wcjtn__disText_wcjtn_ : Laya.Text;
    protected _wcjtn__originW_wcjtn_ : number = 170;
    protected _wcjtn__originH_wcjtn_ : number = 170;

    onAwake()
    {
        this._display_wcjtn_Sp = this.owner.getChildByName("Display") as Laya.Sprite;
        this._wcjtn__originW_wcjtn_ = this._display_wcjtn_Sp.width;
        this._wcjtn__originH_wcjtn_ = this._display_wcjtn_Sp.height;
        this._wcjtn__disText_wcjtn_ = this.owner.getChildByName("TitelText") as Laya.Text;
        this._wcjtn__disText_wcjtn_.overflow = Laya.Text.SCROLL;
        this._wcjtn__disText_wcjtn_.text = "";
    }

    onStart()
    {
        this.auto_wcjtn_Scroll_wcjtn_Text(this._wcjtn__disText_wcjtn_);
    }

    onEnable()
    {
        this._wcjtn_Sprite_wcjtn_.on(Laya.Event.CLICK,this,this.on_wcjtn_Click_wcjtn_Ad)
    }

    onDisable()
    {
        this._wcjtn_Sprite_wcjtn_.off(Laya.Event.CLICK,this,this.on_wcjtn_Click_wcjtn_Ad)
    }

    protected on_wcjtn_Click_wcjtn_Ad()
    {
        this.navigate_wcjtn_To_wcjtn_Mini_wcjtn_Program();
    }

    public set_wcjtn_Data(data)
    {
        this._data = data;
        if(null != this._data)
        {
            let self = this;
            this._display_wcjtn_Sp.loadImage(this._data.logo,Laya.Handler.create(this,function()
            {
                if(!self._display_wcjtn_Sp.destroyed)
                {
                    self._display_wcjtn_Sp.width = self._wcjtn__originW_wcjtn_;
                    self._display_wcjtn_Sp.height = self._wcjtn__originH_wcjtn_;
                }
            }));
            let str = String(this._data.title);
            this._wcjtn__disText_wcjtn_.text = str;
        }
    }
}