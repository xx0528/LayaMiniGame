import ryw_KRQ_HistoryBox from "./KRQ_HistoryBox";
import ryw_KRQ_ComBase from "../KRQ_ComBase";
import ryw_ShareAd from "../../../ShareAd/ShareAd";

export default class ryw_KRQ_History extends ryw_KRQ_ComBase
{
    public ryw_OnBackBtnClick : Function = null;

    protected ryw__topZone : Laya.Clip = null;
    protected ryw__backBtn : Laya.Sprite = null;
    protected ryw__list : Laya.List;
    protected readonly ryw__startList : Array<boolean> = new Array<boolean>();
    
    onAwake()
    {
        this.ryw_AdPosID = ryw_ShareAd.ryw_HistoryLocationID;

        this.ryw__topZone = this.ryw_Sprite.getChildByName("TopZone") as Laya.Clip;
        this.ryw__backBtn = this.ryw__topZone.getChildByName("BackBtn") as Laya.Sprite;

        this.ryw__list = this.ryw_Sprite.getChildByName("List") as Laya.List;
        this.ryw__list.renderHandler = Laya.Handler.create(this, this.ryw_onListRender, null, false);
        this.ryw__list.vScrollBarSkin = "";
    }   

    onStart()
    {
        this.ryw_refresh();
    }

    onEnable()
    {
        this.ryw__backBtn.on(Laya.Event.CLICK,this,this.ryw_onBackBtn);
    }

    onDisable()
    {
        this.ryw__backBtn.off(Laya.Event.CLICK,this,this.ryw_onBackBtn);
    }

    public ryw_refresh(onComplate? : Function)
    {
        let self = this;
        ryw_ShareAd.ryw_getADVs(this.ryw_AdPosID,(datas)=>
        {
            if(null != datas)
            {
                self.ryw__datas = datas;
                self.ryw__startList.splice(0);
                for (let i = 0; i <self.ryw__datas.length; ++i)
                {
                    self.ryw__startList.push(false);
                }
                let num = Math.floor(self.ryw__startList.length * 0.33);
                while(num > 0)
                {
                    let index = Math.floor(Math.random() * self.ryw__startList.length);
                    if(false == self.ryw__startList[index])
                    {
                        self.ryw__startList[index] = true;
                        --num;
                    }
                }
                self.ryw__list.array = self.ryw__datas;
            }
        },false)        
    }

    protected ryw_onListRender(cell: Laya.Box, index: number): void 
    {
        let data = this.ryw__list.array[index];
        let star = this.ryw__startList[index];
        let historyBox : ryw_KRQ_HistoryBox = cell.getComponent(ryw_KRQ_HistoryBox);
        historyBox.ryw_setData(data,star);
    }
    
    protected ryw_onBackBtn()
    {
        this.ryw_hide();
        if(null != this.ryw_OnBackBtnClick)
        {
            this.ryw_OnBackBtnClick();
        }
    }

    public ryw_show()
    {
        super.ryw_show();
        this.ryw_refresh();
    }
}