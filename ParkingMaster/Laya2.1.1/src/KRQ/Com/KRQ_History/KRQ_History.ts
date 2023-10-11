import KRQ_HistoryBox from "./KRQ_HistoryBox";
import KRQ_ComBase from "../KRQ_ComBase";
import ShareAd from "../../../ShareAd/ShareAd";

export default class KRQ_History extends KRQ_ComBase
{
    public OnBackBtnClick : Function = null;

    protected _topZone : Laya.Clip = null;
    protected _backBtn : Laya.Sprite = null;
    protected _list : Laya.List;
    protected readonly _startList : Array<boolean> = new Array<boolean>();
    
    onAwake()
    {
        this.AdPosID = ShareAd.HistoryLocationID;

        this._topZone = this.Sprite.getChildByName("TopZone") as Laya.Clip;
        this._backBtn = this._topZone.getChildByName("BackBtn") as Laya.Sprite;

        this._list = this.Sprite.getChildByName("List") as Laya.List;
        this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
        this._list.vScrollBarSkin = "";
    }   

    onStart()
    {
        this.refresh();
    }

    onEnable()
    {
        this._backBtn.on(Laya.Event.CLICK,this,this.onBackBtn);
    }

    onDisable()
    {
        this._backBtn.off(Laya.Event.CLICK,this,this.onBackBtn);
    }

    public refresh(onComplate? : Function)
    {
        let self = this;
        ShareAd.getADVs(this.AdPosID,(datas)=>
        {
            if(null != datas)
            {
                self._datas = datas;
                self._startList.splice(0);
                for (let i = 0; i <self._datas.length; ++i)
                {
                    self._startList.push(false);
                }
                let num = Math.floor(self._startList.length * 0.33);
                while(num > 0)
                {
                    let index = Math.floor(Math.random() * self._startList.length);
                    if(false == self._startList[index])
                    {
                        self._startList[index] = true;
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
        let star = this._startList[index];
        let historyBox : KRQ_HistoryBox = cell.getComponent(KRQ_HistoryBox);
        historyBox.setData(data,star);
    }
    
    protected onBackBtn()
    {
        this.hide();
        if(null != this.OnBackBtnClick)
        {
            this.OnBackBtnClick();
        }
    }

    public show()
    {
        super.show();
        this.refresh();
    }
}