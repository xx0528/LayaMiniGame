import KRQ_View_XYXZS_ComBase from "./KRQ_ViewComBase";
import Uti_XYXZS_lit from "../../Utilit";

export default class KRQ_E_XYXZS_xport extends KRQ_View_XYXZS_ComBase
{
    public onContinu_XYXZS_eBtnClick : Function = null;

    protected _to_XYXZS_pZone : Laya.Clip = null;
    public get Ba_XYXZS_ckBtn()
    {
        if(null == this._bac_XYXZS_kBtn)
        {
            this._bac_XYXZS_kBtn = this.Sprite.getChildByName("TopZone").getChildByName("BackBtn") as Laya.Sprite;
        }
        return this._bac_XYXZS_kBtn;
    }
    protected _bac_XYXZS_kBtn : Laya.Sprite = null;
    
    protected _cen_XYXZS_terZone : Laya.Clip = null;
    public get Con_XYXZS_tinueBtn()
    {
        if(null == this._cont_XYXZS_inueBtn)
        {
            this._cont_XYXZS_inueBtn = this.Sprite.getChildByName("CenterZone").getChildByName("ContinueBtn") as Laya.Sprite;
        }
        return this._cont_XYXZS_inueBtn;
    }
    protected _cont_XYXZS_inueBtn : Laya.Sprite = null;

    onAwake()
    {
        this._to_XYXZS_pZone = this.Sprite.getChildByName("TopZone") as Laya.Clip;
        if(Uti_XYXZS_lit.isIp_XYXZS_honeX())
        {
            this._to_XYXZS_pZone.top =  this._to_XYXZS_pZone.top + 75;
        }
        this._bac_XYXZS_kBtn = this._to_XYXZS_pZone.getChildByName("BackBtn") as Laya.Sprite;
        this._cen_XYXZS_terZone = this.Sprite.getChildByName("CenterZone") as Laya.Clip;
        if(Uti_XYXZS_lit.isIp_XYXZS_honeX())
        {
            this._cen_XYXZS_terZone.top =  this._cen_XYXZS_terZone.top + 75;
        }
        this._cont_XYXZS_inueBtn = this._cen_XYXZS_terZone.getChildByName("ContinueBtn") as Laya.Sprite;
    }

    onEnable()
    {
        this._bac_XYXZS_kBtn.on(Laya.Event.CLICK,this,this.on_XYXZS_BackBtn);
        this._cont_XYXZS_inueBtn.on(Laya.Event.CLICK,this,this.onCo_XYXZS_ntinueBtn);
    }

    onDisable()
    {
        this._bac_XYXZS_kBtn.off(Laya.Event.CLICK,this,this.on_XYXZS_BackBtn);
        this._cont_XYXZS_inueBtn.off(Laya.Event.CLICK,this,this.onCo_XYXZS_ntinueBtn);
    }

    protected on_XYXZS_BackBtn()
    {
        this.hide();
    }

    protected onCo_XYXZS_ntinueBtn()
    {
        if(null != this.onContinu_XYXZS_eBtnClick)
        {
            this.onContinu_XYXZS_eBtnClick();
        }
    }
}