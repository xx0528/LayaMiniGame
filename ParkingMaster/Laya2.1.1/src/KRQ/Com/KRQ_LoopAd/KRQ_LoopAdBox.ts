import KRQ_ComBase from "../KRQ_ComBase";

export default class KRQ_LoopAdBox extends KRQ_ComBase
{
    protected _displaySp : Laya.Sprite;
    protected _disText : Laya.Text;
    protected _originW : number = 170;
    protected _originH : number = 170;

    onAwake()
    {
        this._displaySp = this.owner.getChildByName("Display") as Laya.Sprite;
        this._originW = this._displaySp.width;
        this._originH = this._displaySp.height;
        this._disText = this.owner.getChildByName("TitelText") as Laya.Text;
        this._disText.overflow = Laya.Text.SCROLL;
        this._disText.text = "";
    }

    onStart()
    {
        this.autoScrollText(this._disText);
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

    public setData(data)
    {
        this._data = data;
        if(null != this._data)
        {
            let self = this;
            this._displaySp.loadImage(this._data.logo,Laya.Handler.create(this,function()
            {
                if(!self._displaySp.destroyed)
                {
                    self._displaySp.width = self._originW;
                    self._displaySp.height = self._originH;
                }
            }));
            let str = String(this._data.title);
            this._disText.text = str;
        }
    }
}