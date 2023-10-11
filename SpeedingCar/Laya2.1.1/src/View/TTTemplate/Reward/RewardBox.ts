import TTReward from "./TTReward";

export default class RewardBox extends Laya.Script 
{
    protected _view_wcjtn_ : TTReward = null;
    
    public get AdTag()
    {
        return this._adTag;
    }
    protected _adTag : Laya.Sprite = null;

    public init(view : TTReward)
    {
        this._view_wcjtn_ = view;
        this._adTag = this.owner.getChildByName("AdTag") as Laya.Sprite;
    }

    onEnable()
    {
        (this.owner as Laya.Sprite).on(Laya.Event.CLICK,this,this.on_wcjtn_SelfClick);
    }

    onDisable()
    {
        (this.owner as Laya.Sprite).off(Laya.Event.CLICK,this,this.on_wcjtn_SelfClick);
    }

    protected on_wcjtn_SelfClick()
    {
        if(null != this._view_wcjtn_)
        {
            this._view_wcjtn_.onRewardBoxClick(this);
        }
    }

}