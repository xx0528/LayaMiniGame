import ViewBase from "../ViewBase";

export default class Tips_myqq_View extends ViewBase
{
    protected _bg : Laya.Sprite;
    protected _tipsText : Laya.Text;

    constructor() { super(); }

    onAwake()
    {
        this._bg = this.owner.getChildByName("Bg") as Laya.Sprite;
        this._bg.x = Laya.stage.width / 2 - this._bg.width / 2;
        this._tipsText = this._bg.getChildByName("Text") as Laya.Text;
    }

    public openView(data?: any): void 
    {
        super.openView(data);
        this.set_myqq_TipsMsg(data);
        Laya.timer.clearAll(this);
        var self = this;
        Laya.timer.once(3000,this,function()
        {   
            self.closeView();
        })
        
        //弹出后设置节点为最高节点
        Laya.stage.setChildIndex(this.owner, Laya.stage._children.length - 1);
    }

    public set_myqq_TipsMsg(msg : string)
    {
        this._tipsText.text = msg;
    }
}