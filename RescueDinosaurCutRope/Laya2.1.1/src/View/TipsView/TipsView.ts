import ViewBase from "../ViewBase";

export default class TipsV_JJKLBB_iew extends ViewBase
{
    protected _b_JJKLBB_g : Laya.Sprite;
    protected _tipsT_JJKLBB_ext : Laya.Text;
    constructor() { super(); }

    onAwake()
    {
        this._b_JJKLBB_g = this.owner.getChildByName("Bg") as Laya.Sprite;
        this._b_JJKLBB_g.x = Laya.stage.width / 2 - this._b_JJKLBB_g.width / 2;
        this._tipsT_JJKLBB_ext = this._b_JJKLBB_g.getChildByName("Text") as Laya.Text;
    }

    addEvent()
    {
        super.addEvent();
    }   

    removeEvent()
    {
        super.removeEvent();
    }

    public openView(data?: any): void 
    {
        super.openView(data);
        this.setTi_JJKLBB_psMsg(data);
        this._b_JJKLBB_g.alpha = 1;
        Laya.timer.clearAll(this);
        Laya.timer.once(2000,this,this.closeView);
        var self = this;
        Laya.Tween.to(this._b_JJKLBB_g,
            {
                alpha : 0
            },500,Laya.Ease.linearNone,Laya.Handler.create(this,()=>
            {
                self.closeView();
            }),1500,true);
    }

    public setTi_JJKLBB_psMsg(msg : string)
    {
        this._tipsT_JJKLBB_ext.text = msg;
    }
}