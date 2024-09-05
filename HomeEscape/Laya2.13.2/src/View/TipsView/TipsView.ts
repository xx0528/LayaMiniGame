import ryw_ViewBase from "../ViewBase";

export default class ryw_TipsView extends ryw_ViewBase
{
    protected ryw__bg : Laya.Sprite;
    protected ryw__tipsText : Laya.Text;

    constructor() { super(); }

    onAwake()
    {
        this.ryw__bg = this.owner.getChildByName("Bg") as Laya.Sprite;
        this.ryw__bg.x = Laya.stage.width / 2 - this.ryw__bg.width / 2;
        this.ryw__tipsText = this.ryw__bg.getChildByName("Text") as Laya.Text;
    }

    public ryw_openView(data?: any): void 
    {
        super.ryw_openView(data);
        this.ryw_setTipsMsg(data);
        Laya.timer.clearAll(this);
        var self = this;
        Laya.timer.once(3000,this,function()
        {   
            self.ryw_closeView();
        })
    }

    public ryw_setTipsMsg(msg : string)
    {
        this.ryw__tipsText.text = msg;
    }
}