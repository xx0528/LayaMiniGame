import KRQ_ppxhc_ComBase from "../../Com/KRQ_ComBase";

export default class KRQ_ppxhc__HistoryBox extends KRQ_ppxhc_ComBase
{
    protected _ppxhc_icon : Laya.Sprite = null;
    protected _ppxhc_text : Laya.Text = null;
    protected _ppxhc_mark : Laya.Sprite = null;

    onAwake()
    {
        this._ppxhc_icon = this.Sprite.getChildByName("Icon") as Laya.Sprite;
        this._ppxhc_text = this.Sprite.getChildByName("Text") as Laya.Text;
        this._ppxhc_text.overflow = Laya.Text.SCROLL;
        this._ppxhc_text.text = "";
        this._ppxhc_mark = this.Sprite.getChildByName("Mark") as Laya.Text;
        this._ppxhc_mark.visible = false;
    }

    onStart()
    {
        this.autoScroll_ppxhc_Text(this._ppxhc_text);
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
        this.navigateToMiniProgram_ppxhc();
    }

    public setData(data,star : boolean)
    {
        this._data = data;
        if(null != this._data)
        {
            var self = this;
            this._ppxhc_icon.loadImage(this._data.logo,Laya.Handler.create(this,function()
            {
                if(!self._ppxhc_icon.destroyed)
                {
                    self._ppxhc_icon.width = 100;
                    self._ppxhc_icon.height = 100;
                }
            }));
            var str = String(this._data.title);
            this._ppxhc_text.text = str;
            this._ppxhc_mark.visible = star;
        }
    }
}