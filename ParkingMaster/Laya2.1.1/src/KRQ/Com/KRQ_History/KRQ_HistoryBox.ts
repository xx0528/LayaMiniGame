import KRQ_ComBase from "../../Com/KRQ_ComBase";

export default class KRQ_HistoryBox extends KRQ_ComBase
{
    protected _icon : Laya.Sprite = null;
    protected _text : Laya.Text = null;
    protected _mark : Laya.Sprite = null;

    onAwake()
    {
        this._icon = this.Sprite.getChildByName("Icon") as Laya.Sprite;
        this._text = this.Sprite.getChildByName("Text") as Laya.Text;
        this._text.overflow = Laya.Text.SCROLL;
        this._text.text = "";
        this._mark = this.Sprite.getChildByName("Mark") as Laya.Text;
        this._mark.visible = false;
    }

    onStart()
    {
        this.autoScrollText(this._text);
    }

    onEnable()
    {
        this.Sprite.on(Laya.Event.CLICK,this,this.onClickAd)
    }

    onDisable()
    {
        this.Sprite.off(Laya.Event.CLICK,this,this.onClickAd)
    }

    protected onClickAd()
    {
        this.navigateToMiniProgram();
    }

    public setData(data,star : boolean)
    {
        this._data = data;
        if(null != this._data)
        {
            var self = this;
            this._icon.loadImage(this._data.logo,Laya.Handler.create(this,function()
            {
                if(!self._icon.destroyed)
                {
                    self._icon.width = 100;
                    self._icon.height = 100;
                }
            }));
            var str = String(this._data.title);
            this._text.text = str;
            this._mark.visible = star;
        }
    }
}