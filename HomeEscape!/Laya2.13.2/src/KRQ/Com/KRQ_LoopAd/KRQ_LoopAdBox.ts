import ryw_KRQ_ComBase from "../KRQ_ComBase";

export default class ryw_KRQ_LoopAdBox extends ryw_KRQ_ComBase
{
    protected ryw__displaySp : Laya.Sprite;
    protected ryw__disText : Laya.Text;
    protected ryw__originW : number = 170;
    protected ryw__originH : number = 170;

    onAwake()
    {
        this.ryw__displaySp = this.owner.getChildByName("Display") as Laya.Sprite;
        this.ryw__originW = this.ryw__displaySp.width;
        this.ryw__originH = this.ryw__displaySp.height;
        this.ryw__disText = this.owner.getChildByName("TitelText") as Laya.Text;
        this.ryw__disText.overflow = Laya.Text.SCROLL;
        this.ryw__disText.text = "";
    }

    onStart()
    {
        this.ryw_autoScrollText(this.ryw__disText);
    }

    onEnable()
    {
        this.ryw_Sprite.on(Laya.Event.CLICK,this,this.ryw_onClickAd)
    }

    onDisable()
    {
        this.ryw_Sprite.off(Laya.Event.CLICK,this,this.ryw_onClickAd)
    }

    protected ryw_onClickAd()
    {
        this.ryw_navigateToMiniProgram();
    }

    public ryw_setData(data)
    {
        this.ryw__data = data;
        if(null != this.ryw__data)
        {
            let self = this;
            this.ryw__displaySp.loadImage(this.ryw__data.logo,Laya.Handler.create(this,function()
            {
                if(!self.ryw__displaySp.destroyed)
                {
                    self.ryw__displaySp.width = self.ryw__originW;
                    self.ryw__displaySp.height = self.ryw__originH;
                }
            }));
            let str = String(this.ryw__data.title);
            this.ryw__disText.text = str;
        }
    }
}