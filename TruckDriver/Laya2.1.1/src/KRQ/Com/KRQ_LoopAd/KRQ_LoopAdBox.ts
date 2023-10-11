import KRQ_ppxhc_ComBase from "../KRQ_ComBase";

export default class KRQ_ppxhc_LoopAdBox extends KRQ_ppxhc_ComBase
{
    protected _display_ppxhc_Sp : Laya.Sprite;
    protected _dis_ppxhc_Text : Laya.Text;
    protected _origin_ppxhc_W : number = 170;
    protected _origin_ppxhc_H : number = 170;

    onAwake()
    {
        this._display_ppxhc_Sp = this.owner.getChildByName("Display") as Laya.Sprite;
        this._origin_ppxhc_W = this._display_ppxhc_Sp.width;
        this._origin_ppxhc_H = this._display_ppxhc_Sp.height;
        this._dis_ppxhc_Text = this.owner.getChildByName("TitelText") as Laya.Text;
        this._dis_ppxhc_Text.overflow = Laya.Text.SCROLL;
        this._dis_ppxhc_Text.text = "";
    }

    onStart()
    {
        this.autoScroll_ppxhc_Text(this._dis_ppxhc_Text);
    }

    onEnable()
    {
        this.Sprite.on(Laya.Event.CLICK,this,this.onClick_ppxhc_Ad)
    }

    onDisable()
    {
        this.Sprite.off(Laya.Event.CLICK,this,this.onClick_ppxhc_Ad)
    }

    protected onClick_ppxhc_Ad()
    {
        this.navigateToMiniProgram_ppxhc();
    }

    public set_ppxhc_Data(data)
    {
        this._data = data;
        if(null != this._data)
        {
            let self = this;
            this._display_ppxhc_Sp.loadImage(this._data.logo,Laya.Handler.create(this,function()
            {
                if(!self._display_ppxhc_Sp.destroyed)
                {
                    self._display_ppxhc_Sp.width = self._origin_ppxhc_W;
                    self._display_ppxhc_Sp.height = self._origin_ppxhc_H;
                }
            }));
            let str = String(this._data.title);
            this._dis_ppxhc_Text.text = str;
        }
    }
}