import View_XYXZS_Base from "../ViewBase";

export default class Tip_XYXZS_sView extends View_XYXZS_Base
{
    protected _b_XYXZS_g : Laya.Sprite;
    protected _tips_XYXZS_Text : Laya.Text;

    constructor() { super(); }

    onAwake()
    {
        this._b_XYXZS_g = this.owner.getChildByName("Bg") as Laya.Sprite;
        this._b_XYXZS_g.x = Laya.stage.width / 2 - this._b_XYXZS_g.width / 2;
        this._tips_XYXZS_Text = this._b_XYXZS_g.getChildByName("Text") as Laya.Text;
    }

    public openView(data?: any): void 
    {
        super.openView(data);
        this.setTi_XYXZS_psMsg(data);
        Laya.timer.clearAll(this);
        var self = this;
        Laya.timer.once(3000,this,function()
        {   
            self.closeView();
        })
    }

    public setTi_XYXZS_psMsg(msg : string)
    {
        this._tips_XYXZS_Text.text = msg;
    }
}