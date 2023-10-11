import KRQ__XYXZS_ComBase from "../../Com/KRQ_ComBase";

export default class KRQ_Hist_XYXZS_oryBox extends KRQ__XYXZS_ComBase
{
    protected _ic_XYXZS_on : Laya.Sprite = null;
    protected _t_XYXZS_ext : Laya.Text = null;
    protected _m_XYXZS_ark : Laya.Sprite = null;

    onAwake()
    {
        this._ic_XYXZS_on = this.Sp_XYXZS_rite.getChildByName("Icon") as Laya.Sprite;
        this._t_XYXZS_ext = this.Sp_XYXZS_rite.getChildByName("Text") as Laya.Text;
        this._t_XYXZS_ext.overflow = Laya.Text.SCROLL;
        this._t_XYXZS_ext.text = "";
        this._m_XYXZS_ark = this.Sp_XYXZS_rite.getChildByName("Mark") as Laya.Text;
        this._m_XYXZS_ark.visible = false;
    }

    onStart()
    {
        this.autoScr_XYXZS_ollText(this._t_XYXZS_ext);
    }

    onEnable()
    {
        this.Sp_XYXZS_rite.on(Laya.Event.CLICK,this,this.onCli_XYXZS_ckAd)
    }

    onDisable()
    {
        this.Sp_XYXZS_rite.off(Laya.Event.CLICK,this,this.onCli_XYXZS_ckAd)
    }

    protected onCli_XYXZS_ckAd()
    {
        this.navigateT_XYXZS_oMiniProgram();
    }

    public set_XYXZS_Data(data,star : boolean)
    {
        this._d_XYXZS_ata = data;
        if(null != this._d_XYXZS_ata)
        {
            var self = this;
            this._ic_XYXZS_on.loadImage(this._d_XYXZS_ata.logo,Laya.Handler.create(this,function()
            {
                if(!self._ic_XYXZS_on.destroyed)
                {
                    self._ic_XYXZS_on.width = 100;
                    self._ic_XYXZS_on.height = 100;
                }
            }));
            var str = String(this._d_XYXZS_ata.title);
            this._t_XYXZS_ext.text = str;
            this._m_XYXZS_ark.visible = star;
        }
    }
}