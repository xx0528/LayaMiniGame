import KRQ__wcjtn_Com_wcjtn_Base from "../../Com/KRQ_ComBase";

export default class KRQ__wcjtn_History_wcjtn_Box extends KRQ__wcjtn_Com_wcjtn_Base
{
    protected __wcjtn_icon : Laya.Sprite = null;
    protected __wcjtn_text : Laya.Text = null;
    protected __wcjtn_mark : Laya.Sprite = null;

    onAwake()
    {
        this.__wcjtn_icon = this._wcjtn_Sprite_wcjtn_.getChildByName("Icon") as Laya.Sprite;
        this.__wcjtn_text = this._wcjtn_Sprite_wcjtn_.getChildByName("Text") as Laya.Text;
        this.__wcjtn_text.overflow = Laya.Text.SCROLL;
        this.__wcjtn_text.text = "";
        this.__wcjtn_mark = this._wcjtn_Sprite_wcjtn_.getChildByName("Mark") as Laya.Text;
        this.__wcjtn_mark.visible = false;
    }

    onStart()
    {
        this.auto_wcjtn_Scroll_wcjtn_Text(this.__wcjtn_text);
    }

    onEnable()
    {
        this._wcjtn_Sprite_wcjtn_.on(Laya.Event.CLICK,this,this.onClic_wcjtn_kAd)
    }

    onDisable()
    {
        this._wcjtn_Sprite_wcjtn_.off(Laya.Event.CLICK,this,this.onClic_wcjtn_kAd)
    }

    protected onClic_wcjtn_kAd()
    {
        this.navigate_wcjtn_To_wcjtn_Mini_wcjtn_Program();
    }

    public setData(data,star : boolean)
    {
        this._data = data;
        if(null != this._data)
        {
            var self = this;
            this.__wcjtn_icon.loadImage(this._data.logo,Laya.Handler.create(this,function()
            {
                if(!self.__wcjtn_icon.destroyed)
                {
                    self.__wcjtn_icon.width = 100;
                    self.__wcjtn_icon.height = 100;
                }
            }));
            var str = String(this._data.title);
            this.__wcjtn_text.text = str;
            this.__wcjtn_mark.visible = star;
        }
    }
}