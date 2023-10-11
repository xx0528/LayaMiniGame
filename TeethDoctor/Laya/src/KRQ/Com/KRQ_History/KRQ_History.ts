import KRQ_Hist_XYXZS_oryBox from "./KRQ_HistoryBox";
import KRQ__XYXZS_ComBase from "../KRQ_ComBase";
import Shar_XYXZS_eAd from "../../../ShareAd/ShareAd";

export default class KRQ__XYXZS_History extends KRQ__XYXZS_ComBase
{
    public OnBackB_XYXZS_tnClick : Function = null;

    protected _to_XYXZS_pZone : Laya.Clip = null;
    protected _ba_XYXZS_ckBtn : Laya.Sprite = null;
    protected _l_XYXZS_ist : Laya.List;
    protected readonly _sta_XYXZS_rtList : Array<boolean> = new Array<boolean>();
    
    onAwake()
    {
        this.AdP_XYXZS_osID = Shar_XYXZS_eAd.Histo_XYXZS_ryLocationID;

        this._to_XYXZS_pZone = this.Sp_XYXZS_rite.getChildByName("TopZone") as Laya.Clip;
        this._ba_XYXZS_ckBtn = this._to_XYXZS_pZone.getChildByName("BackBtn") as Laya.Sprite;

        this._l_XYXZS_ist = this.Sp_XYXZS_rite.getChildByName("List") as Laya.List;
        this._l_XYXZS_ist.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
        this._l_XYXZS_ist.vScrollBarSkin = "";
    }   

    onStart()
    {
        this.re_XYXZS_fres();
    }

    onEnable()
    {
        this._ba_XYXZS_ckBtn.on(Laya.Event.CLICK,this,this.onBa_XYXZS_ckBtn);
    }

    onDisable()
    {
        this._ba_XYXZS_ckBtn.off(Laya.Event.CLICK,this,this.onBa_XYXZS_ckBtn);
    }

    public re_XYXZS_fres(onComplate? : Function)
    {
        let self = this;
        Shar_XYXZS_eAd.ge_XYXZS_tADVs(this.AdP_XYXZS_osID,(datas)=>
        {
            if(null != datas)
            {
                self._da_XYXZS_tas = datas;
                self._sta_XYXZS_rtList.splice(0);
                for (let i = 0; i <self._da_XYXZS_tas.length; ++i)
                {
                    self._sta_XYXZS_rtList.push(false);
                }
                let num = Math.floor(self._sta_XYXZS_rtList.length * 0.33);
                while(num > 0)
                {
                    let index = Math.floor(Math.random() * self._sta_XYXZS_rtList.length);
                    if(false == self._sta_XYXZS_rtList[index])
                    {
                        self._sta_XYXZS_rtList[index] = true;
                        --num;
                    }
                }
                self._l_XYXZS_ist.array = self._da_XYXZS_tas;
            }
        })        
    }

    protected onListRender(cell: Laya.Box, index: number): void 
    {
        let data = this._l_XYXZS_ist.array[index];
        let star = this._sta_XYXZS_rtList[index];
        let historyBox : KRQ_Hist_XYXZS_oryBox = cell.getComponent(KRQ_Hist_XYXZS_oryBox);
        historyBox.set_XYXZS_Data(data,star);
    }
    
    protected onBa_XYXZS_ckBtn()
    {
        this.hide();
        if(null != this.OnBackB_XYXZS_tnClick)
        {
            this.OnBackB_XYXZS_tnClick();
        }
    }

    public show()
    {
        super.show();
        this.re_XYXZS_fres();
    }
}