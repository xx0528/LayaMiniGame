import KRQ__XYXZS_ComBase from "../KRQ_ComBase";

export default class KRQ_Loo_XYXZS_pAdBox extends KRQ__XYXZS_ComBase
{
    protected _displaySp : Laya.Sprite;
  //  protected _disText : Laya.Text;
    protected _originW : number = 170;
    protected _originH : number = 170;

    onAwake()
    {
        this._displaySp = this.owner.getChildByName("Display") as Laya.Sprite;
        this._originW = this._displaySp.width;
        this._originH = this._displaySp.height;
      //  this._disText = this.owner.getChildByName("TitelText") as Laya.Text;
    //    this._disText.overflow = Laya.Text.SCROLL;
     //   this._disText.text = "";
    }

    onStart()
    {
    //    this.autoScrollText(this._disText);
    }

    onEnable()
    {
        this.Sp_XYXZS_rite.on(Laya.Event.CLICK,this,this.onCl_XYXZS_ickAd)
    }

    onDisable()
    {
        this.Sp_XYXZS_rite.off(Laya.Event.CLICK,this,this.onCl_XYXZS_ickAd)
    }

    protected onCl_XYXZS_ickAd()
    {
        this.navigateT_XYXZS_oMiniProgram();
    }

    public set_XYXZS_Data(data)
    {
        this._d_XYXZS_ata = data;
        if(null != this._d_XYXZS_ata)
        {
            let self = this;
            this._displaySp.loadImage(this._d_XYXZS_ata.logo,Laya.Handler.create(this,function()
            {
                if(!self._displaySp.destroyed)
                {
                    self._displaySp.width = self._originW;
                    self._displaySp.height = self._originH;
                }
            }));
        //    let str = String(this._data.title);
         //   this._disText.text = str;
        }
    }
}