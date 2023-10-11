import KRQ__wcjtn_History_wcjtn_Box from "./KRQ_HistoryBox";
import KRQ__wcjtn_Com_wcjtn_Base from "../KRQ_ComBase";
import _wcjtn_ShareAd_wcjtn_ from "../../../ShareAd/ShareAd";

export default class KRQ_wcjtn__His_wcjtn_tory extends KRQ__wcjtn_Com_wcjtn_Base
{
    public On_wcjtn_Back_wcjtn_Btn_wcjtn_Click : Function = null;

    protected _top_wcjtn_Zone : Laya.Clip = null;
    protected _back_wcjtn_Btn : Laya.Sprite = null;
    protected _list : Laya.List;
    protected readonly _start_wcjtn_List : Array<boolean> = new Array<boolean>();
    
    onAwake()
    {
        this.Ad_wcjtn_Pos_wcjtn_ID = _wcjtn_ShareAd_wcjtn_.History_wcjtn_LocationID;

        this._top_wcjtn_Zone = this._wcjtn_Sprite_wcjtn_.getChildByName("TopZone") as Laya.Clip;
        this._back_wcjtn_Btn = this._top_wcjtn_Zone.getChildByName("BackBtn") as Laya.Sprite;

        this._list = this._wcjtn_Sprite_wcjtn_.getChildByName("List") as Laya.List;
        this._list.renderHandler = Laya.Handler.create(this, this.on_wcjtn_List_wcjtn_Render, null, false);
        this._list.vScrollBarSkin = "";
    }   

    onStart()
    {
        this.ref_wcjtn_resh();
    }

    onEnable()
    {
        this._back_wcjtn_Btn.on(Laya.Event.CLICK,this,this.on_wcjtn_Back_wcjtn_Btn);
    }

    onDisable()
    {
        this._back_wcjtn_Btn.off(Laya.Event.CLICK,this,this.on_wcjtn_Back_wcjtn_Btn);
    }

    public ref_wcjtn_resh(onComplate? : Function)
    {
        let self = this;
        _wcjtn_ShareAd_wcjtn_.get_wcjtn_ADVs(this.Ad_wcjtn_Pos_wcjtn_ID,(datas)=>
        {
            if(null != datas)
            {
                self._datas = datas;
                self._start_wcjtn_List.splice(0);
                for (let i = 0; i <self._datas.length; ++i)
                {
                    self._start_wcjtn_List.push(false);
                }
                let num = Math.floor(self._start_wcjtn_List.length * 0.33);
                while(num > 0)
                {
                    let index = Math.floor(Math.random() * self._start_wcjtn_List.length);
                    if(false == self._start_wcjtn_List[index])
                    {
                        self._start_wcjtn_List[index] = true;
                        --num;
                    }
                }
                self._list.array = self._datas;
            }
        },false)        
    }

    protected on_wcjtn_List_wcjtn_Render(cell: Laya.Box, index: number): void 
    {
        let data = this._list.array[index];
        let star = this._start_wcjtn_List[index];
        let historyBox : KRQ__wcjtn_History_wcjtn_Box = cell.getComponent(KRQ__wcjtn_History_wcjtn_Box);
        historyBox.setData(data,star);
    }
    
    protected on_wcjtn_Back_wcjtn_Btn()
    {
        this._wcjtn_hide_wcjtn_();
        if(null != this.On_wcjtn_Back_wcjtn_Btn_wcjtn_Click)
        {
            this.On_wcjtn_Back_wcjtn_Btn_wcjtn_Click();
        }
    }

    public _wcjtn_show_wcjtn_()
    {
        super._wcjtn_show_wcjtn_();
        this.ref_wcjtn_resh();
    }
}