import KRQ_ppxhc__HistoryBox from "./KRQ_HistoryBox";
import KRQ_ppxhc_ComBase from "../KRQ_ComBase";
import Share_ppxhc_Ad from "../../../ShareAd/ShareAd";

export default class KRQ_ppxhc_History extends KRQ_ppxhc_ComBase
{
    public OnBackBtn_ppxhc_Click : Function = null;

    protected _top_ppxhc_Zone : Laya.Clip = null;
    protected _back_ppxhc_Btn : Laya.Sprite = null;
    protected _list : Laya.List;
    protected readonly _start_ppxhc_List : Array<boolean> = new Array<boolean>();
    
    onAwake()
    {
        this.AdPos_ppxhc_ID = Share_ppxhc_Ad.HistoryLocationID_;

        this._top_ppxhc_Zone = this.Sprite.getChildByName("TopZone") as Laya.Clip;
        this._back_ppxhc_Btn = this._top_ppxhc_Zone.getChildByName("BackBtn") as Laya.Sprite;

        this._list = this.Sprite.getChildByName("List") as Laya.List;
        this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
        this._list.vScrollBarSkin = "";
    }   

    onStart()
    {
        this.refresh_ppxhc();
    }

    onEnable()
    {
        this._back_ppxhc_Btn.on(Laya.Event.CLICK,this,this.onBackBtn);
    }

    onDisable()
    {
        this._back_ppxhc_Btn.off(Laya.Event.CLICK,this,this.onBackBtn);
    }

    public refresh_ppxhc(onComplate? : Function)
    {
        let self = this;
        Share_ppxhc_Ad.getADVs_(this.AdPos_ppxhc_ID,(datas)=>
        {
            if(null != datas)
            {
                self._datas = datas;
                self._start_ppxhc_List.splice(0);
                for (let i = 0; i <self._datas.length; ++i)
                {
                    self._start_ppxhc_List.push(false);
                }
                let num = Math.floor(self._start_ppxhc_List.length * 0.33);
                while(num > 0)
                {
                    let index = Math.floor(Math.random() * self._start_ppxhc_List.length);
                    if(false == self._start_ppxhc_List[index])
                    {
                        self._start_ppxhc_List[index] = true;
                        --num;
                    }
                }
                self._list.array = self._datas;
            }
        },false)        
    }

    protected onListRender(cell: Laya.Box, index: number): void 
    {
        let data = this._list.array[index];
        let star = this._start_ppxhc_List[index];
        let historyBox : KRQ_ppxhc__HistoryBox = cell.getComponent(KRQ_ppxhc__HistoryBox);
        historyBox.setData(data,star);
    }
    
    protected onBackBtn()
    {
        this.hide();
        if(null != this.OnBackBtn_ppxhc_Click)
        {
            this.OnBackBtn_ppxhc_Click();
        }
    }

    public show()
    {
        super.show();
        this.refresh_ppxhc();
    }
}