import TTReward from "./TTReward";

export default class RewardBox extends Laya.Script 
{
    protected _view_ZMDGJ_ : TTReward = null;
    
    public get AdTag()
    {
        return this._adTag;
    }
    protected _adTag : Laya.Sprite = null;

    public init(view : TTReward)
    {
        this._view_ZMDGJ_ = view;
        this._adTag = this.owner.getChildByName("AdTag") as Laya.Sprite;
    }

    onEnable()
    {
        super.onEnable();
        (this.owner as Laya.Sprite).on(Laya.Event.CLICK,this,this.on_ZMDGJ_SelfClick);
    }

    onDisable()
    {
        super.onDisable();
        (this.owner as Laya.Sprite).off(Laya.Event.CLICK,this,this.on_ZMDGJ_SelfClick);
    }

    protected on_ZMDGJ_SelfClick()
    {
        if(null != this._view_ZMDGJ_)
        {
            this._view_ZMDGJ_.onRewardBoxClick(this);
        }
    }

}