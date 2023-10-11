import View_wcjtn_Base from "../ViewBase";

export default class Tips_wcjtn_View extends View_wcjtn_Base
{
    protected _wcjtn__bg_wcjtn_ : Laya.Sprite;
    protected _tips_wcjtn_Text : Laya.Text;

    constructor() { super(); }

    onAwake()
    {
        this._wcjtn__bg_wcjtn_ = this.owner.getChildByName("Bg") as Laya.Sprite;
        this._wcjtn__bg_wcjtn_.x = Laya.stage.width / 2 - this._wcjtn__bg_wcjtn_.width / 2;
        this._tips_wcjtn_Text = this._wcjtn__bg_wcjtn_.getChildByName("Text") as Laya.Text;
    }

    public open_wcjtn_View(data?: any): void 
    {
        super.open_wcjtn_View(data);
        this.set_wcjtn_Tips_wcjtn_Msg(data);
        Laya.timer.clearAll(this);
        var self = this;
        Laya.timer.once(3000,this,function()
        {   
            self.close_wcjtn_View();
        })
    }

    public set_wcjtn_Tips_wcjtn_Msg(msg : string)
    {
        this._tips_wcjtn_Text.text = msg;
    }
}