import ryw_KRQ_ComBase from "../../Com/KRQ_ComBase";

export default class ryw_KRQ_HistoryBox extends ryw_KRQ_ComBase
{
    protected ryw__icon : Laya.Sprite = null;
    protected ryw__text : Laya.Text = null;
    protected ryw__mark : Laya.Sprite = null;

    onAwake()
    {
        this.ryw__icon = this.ryw_Sprite.getChildByName("Icon") as Laya.Sprite;
        this.ryw__text = this.ryw_Sprite.getChildByName("Text") as Laya.Text;
        this.ryw__text.overflow = Laya.Text.SCROLL;
        this.ryw__text.text = "";
        this.ryw__mark = this.ryw_Sprite.getChildByName("Mark") as Laya.Text;
        this.ryw__mark.visible = false;
    }

    onStart()
    {
        this.ryw_autoScrollText(this.ryw__text);
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

    public ryw_setData(data,star : boolean)
    {
        this.ryw__data = data;
        if(null != this.ryw__data)
        {
            var self = this;
            this.ryw__icon.loadImage(this.ryw__data.logo,Laya.Handler.create(this,function()
            {
                if(!self.ryw__icon.destroyed)
                {
                    self.ryw__icon.width = 100;
                    self.ryw__icon.height = 100;
                }
            }));
            var str = String(this.ryw__data.title);
            this.ryw__text.text = str;
            this.ryw__mark.visible = star;
        }
    }
}