import KRQ__XYXZS_Banner from "../Com/KRQ_Banner";
import KRQ_View_XYXZS_ComBase from "./KRQ_ViewComBase";
import KRQ__XYXZS_History from "../Com/KRQ_History/KRQ_History";
import KRQ_H_XYXZS_LoopAd from "../Com/KRQ_LoopAd/KRQ_HLoopAd";
import Uti_XYXZS_lit from "../../Utilit";

export default class KRQ__XYXZS_Main extends KRQ_View_XYXZS_ComBase
{
    protected _top_XYXZS_Zone : Laya.Clip = null;
    protected _hist_XYXZS_oryBtn : Laya.Sprite = null;
    protected _krqLo_XYXZS_opAd : KRQ_H_XYXZS_LoopAd = null;

    protected _bott_XYXZS_omZone : Laya.Clip = null;
    protected _krqB_XYXZS_anner : KRQ__XYXZS_Banner = null;

    protected _krq_XYXZS_History : KRQ__XYXZS_History = null;

    onAwake()
    {
        this._top_XYXZS_Zone = this.Sprite.getChildByName("TopZone") as Laya.Clip;
        this._hist_XYXZS_oryBtn = this._top_XYXZS_Zone.getChildByName("HistoryBtn") as Laya.Sprite;

        if(Uti_XYXZS_lit.isIp_XYXZS_honeX())
        {
            this._top_XYXZS_Zone.top =  this._top_XYXZS_Zone.top + 75;
        }
        
        this._krqLo_XYXZS_opAd  = this.Sprite.getChildByName("KRQ_HLoopAd").getComponent(KRQ_H_XYXZS_LoopAd) as KRQ_H_XYXZS_LoopAd;
        this._krqB_XYXZS_anner = this.Sprite.getChildByName("KRQ_Banner").getComponent(KRQ__XYXZS_Banner) as KRQ__XYXZS_Banner;
        this._krq_XYXZS_History = this.Sprite.getChildByName("KRQ_History").getComponent(KRQ__XYXZS_History) as KRQ__XYXZS_History;
        let self = this;
        this._krq_XYXZS_History.OnBackB_XYXZS_tnClick =()=>
        {
            self._krqB_XYXZS_anner.show();
        }

        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5) 
        {
            this._krqLo_XYXZS_opAd.Clip.top = 100;
            if(Uti_XYXZS_lit.isIp_XYXZS_honeX())
            {
                this._krqLo_XYXZS_opAd.Clip.top =  this._krqLo_XYXZS_opAd.Clip.top + 75;
            }
            this._krqB_XYXZS_anner.Sp_XYXZS_rite.visible = true;
        }
        else
        {
            this._krqLo_XYXZS_opAd.Clip.top = Laya.stage.height - 280;
            this._krqB_XYXZS_anner.Sp_XYXZS_rite.visible = false;
        }
    }

    onEnable()
    {
        this._hist_XYXZS_oryBtn.on(Laya.Event.CLICK,this,this.onHis_XYXZS_toryBtn);
    }

    onDisable()
    {
        this._hist_XYXZS_oryBtn.off(Laya.Event.CLICK,this,this.onHis_XYXZS_toryBtn);
    }

    protected onHis_XYXZS_toryBtn()
    {
        this._krq_XYXZS_History.show();
        this._krqB_XYXZS_anner.hide();
    }
}