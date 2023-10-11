import TTReward from "./TTReward";

export default class RewardBox extends Laya.Script 
{
    protected _view : TTReward = null;
    
    public get AdTag()
    {
        return this._adTag;
    }
    protected _adTag : Laya.Sprite = null;

    public init(view : TTReward)
    {
        this._view = view;
        this._adTag = this.owner.getChildByName("AdTag") as Laya.Sprite;
    }

    onEnable()
    {
        (this.owner as Laya.Sprite).on(Laya.Event.CLICK,this,this.onSelfClick);
    }

    onDisable()
    {
        (this.owner as Laya.Sprite).off(Laya.Event.CLICK,this,this.onSelfClick);
    }

    protected onSelfClick()
    {
        if(null != this._view)
        {
            this._view.onRewardBoxClick(this);
        }
    }

}